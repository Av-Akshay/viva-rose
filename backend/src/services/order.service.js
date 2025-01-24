const Cart = require("../models/cart.model.js");
const Order = require("../models/order.model.js");
const Jewellery = require("../models/jewellery.model.js");
const User = require("../models/user.model.js");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
} = require("../errors/errors.js");

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Utility: Fetch and validate cart
const fetchValidCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.jewelleryId");
    if (!cart || cart.items.length === 0) {
        throw new BadRequestError("Cart is empty or not found");
    }

    const validItems = [];
    for (const item of cart.items) {
        if (item.jewelleryId.stockStatus === "in-stock" && item.quantity <= item.jewelleryId.stockCount) {
            validItems.push(item);
        } else {
            throw new BadRequestError(
                `Item ${item.jewelleryId.name} (ID: ${item.jewelleryId._id}) is unavailable or exceeds stock.`
            );
        }
    }

    if (validItems.length === 0) {
        throw new BadRequestError("No valid items available to place an order");
    }

    return { cart, validItems };
};

const generateOrderCode = async () => {
    let id;
    do {
        id = Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14); // Generates a number between 10^14 and 10^15 - 1
    } while (id % 10 === 0); // Ensures it does not end in zero
    return id; // Returns the number as a string
};


// Create an order
const createCartOrder = async (userId, addressId) => {
    const { cart, validItems } = await fetchValidCart(userId);
    let orderCode=0;
    let orderCodeCheck=[];
    do {
        orderCode = await generateOrderCode();
    
        // Check if the generated order code already exists
        orderCodeCheck = await Order.find({ orderCode });
    } while (orderCodeCheck.length > 0); // Repeat if the order code already exists

    const totalAmount = validItems.reduce((sum, item) => sum + item.jewelleryId.price * item.quantity, 0);

    const order = new Order({
        userId,
        orderCode,
        items: validItems,
        totalAmount,
        addressId
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Deduct stock and clear cart
    for (const item of order.items) {
        const jewellery = await Jewellery.findById(item.jewelleryId._id);
        if (!jewellery) throw new NotFoundError(`Jewellery not found for ID ${item.jewelleryId._id}`);
        jewellery.stockCount -= item.quantity;
        jewellery.orders.push(order._id);
        await jewellery.save();
    }
    cart.items = [];
    await cart.save();

    return { message: "Order placed successfully", order };
};

// Create an order
const createBuyNowOrder = async (userId, addressId, itemData) => {

    let orderCode=0;
    let orderCodeCheck=[];
    do {
        orderCode = await generateOrderCode();
    
        // Check if the generated order code already exists
        orderCodeCheck = await Order.find({ orderCode });
    } while (orderCodeCheck.length > 0); // Repeat if the order code already exists

    const jewellery = await Jewellery.findById(itemData.jewelleryId);
    const items=[];
    const jewelleryId=itemData.jewelleryId;
    const quantity=itemData.quantity;
    items.push({
        jewelleryId,
        quantity
    });
    
    const totalAmount = jewellery.price * quantity;

    const order = new Order({
        userId,
        orderCode,
        items,
        totalAmount,
        addressId
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Deduct stock and clear cart
    for (const item of order.items) {
        const jewellery = await Jewellery.findById(item.jewelleryId._id);
        if (!jewellery) throw new NotFoundError(`Jewellery not found for ID ${item.jewelleryId._id}`);
        jewellery.stockCount -= item.quantity;
        jewellery.orders.push(order._id);
        await jewellery.save();
    }

    return { message: "Order placed successfully", order };
};

// Initiate Razorpay payment
const initiatePayment = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new NotFoundError("Order not found");

    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: `order_${order._id}`,
    });

    order.paymentId = razorpayOrder.id;
    await order.save();

    return { razorpayOrder };
};

// Verify Razorpay payment
const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new BadRequestError("Payment verification failed");
    }

    const order = await Order.findOne({ paymentId: razorpay_order_id });
    if (!order) throw new NotFoundError("Order not found");

    // Deduct stock and clear cart
    for (const item of order.items) {
        const jewellery = await Jewellery.findById(item.jewelleryId._id);
        if (!jewellery) throw new NotFoundError(`Jewellery not found for ID ${item.jewelleryId._id}`);
        jewellery.stockCount -= item.quantity;
        await jewellery.save();
    }
    order.paymentStatus = "Paid";
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    await order.save();

    return { message: "Payment successful", order };
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
    const orders = await Order.find({ userId }).populate("items.jewelleryId");
    if (!orders) throw new NotFoundError("Orders not found");
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate("items.jewelleryId");
    if (!order) throw new NotFoundError("Order not found");
    return order;
};

// Update order status
const updateOrderShippingStatus = async (orderId, status) => {
    const orderStatus=status.orderStatus;
    const shippingStatus=status.shippingStatus;
    const order = await Order.findById(orderId).populate("items.jewelleryId");
    if (!order) throw new NotFoundError("Order not found");
    if (!orderStatus) throw new BadRequestError("Order status is required");

    if (orderStatus === "Cancelled" || orderStatus==="Returned") {
        for (const item of order.items) {
            const jewellery = await Jewellery.findById(item.jewelleryId);
            if (jewellery) {
                jewellery.stockCount += item.quantity;
                await jewellery.save();
            } else {
                console.error(`Jewellery with ID ${item.jewelleryId} not found`);
            }
        }
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
    if (!updatedOrder) throw new NotFoundError("Order not found");
    return updatedOrder;
};


// Delete an order
const deleteOrder = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new NotFoundError("Order not found");
    const user = await User.findById(order.userId);
    user.orders = user.orders.filter(
        (id) => id.toString() !== orderId.toString()
    );
    await user.save();
    for (const item of order.items) {
        const jewellery = await Jewellery.findById(item.jewelleryId._id);
        if (!jewellery) throw new NotFoundError(`Jewellery not found for ID ${item.jewelleryId._id}`);
        jewellery.orders = jewellery.orders.filter(
            (id) => id.toString() !== orderId.toString()
        );
        await jewellery.save();
    }
    return { message: "Order deleted successfully", order };
};

module.exports = {
    createCartOrder,
    createBuyNowOrder,
    initiatePayment,
    verifyPayment,
    getOrdersByUserId,
    getOrderById,
    updateOrderShippingStatus,
    deleteOrder,
};
