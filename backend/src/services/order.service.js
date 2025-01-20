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

// Create an order
const createOrder = async (userId) => {
    const { cart, validItems } = await fetchValidCart(userId);

    const totalAmount = validItems.reduce((sum, item) => sum + item.jewelleryId.price * item.quantity, 0);

    const order = new Order({
        userId,
        items: validItems,
        totalAmount,
    });
    const currentDate = new Date();
    order.deliveryDate= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);

    // Deduct stock and clear cart
    for (const item of validItems) {
        const jewellery = await Jewellery.findById(item.jewelleryId._id);
        if (!jewellery) throw new NotFoundError(`Jewellery not found for ID ${item.jewelleryId._id}`);
        jewellery.stockCount -= item.quantity;
        await jewellery.save();
    }
    cart.items = [];
    await cart.save();

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
const updateOrderStatus = async (orderId, status) => {
    if (!status) throw new BadRequestError("Order status is required");
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) throw new NotFoundError("Order not found");
    return order;
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
    return { message: "Order deleted successfully", order };
};

module.exports = {
    createOrder,
    initiatePayment,
    verifyPayment,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};
