const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
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

// Create an order from the cart
const createOrder = async (userId) => {
        const cart = await Cart.findOne({ userId }).populate("items.jewelleryId");
        if (!cart || cart.items.length === 0) {
            throw new BadRequestError("Cart is empty");
        }
        if(cart.items){
            const validItems=[];
            console.log(cart.items);
            for(item in cart.items){
                if(item.jewelleryId.stockStatus==='in-stock'){
                    validItems.push(item) ;
            }
        }
    }
       console.log(validItems);

        // Calculate total amount
        const totalAmount = validItems.reduce((sum, item) => {
            return sum + item.jewelleryId.price * item.quantity;
        }, 0);

        // Create an order
        const order = new Order({
            userId,
            items: validItems,
            totalAmount,
        });

        await order.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        return { message: "Order placed successfully", order };
};

// Initiate Razorpay payment
const initiatePayment = async (orderId) => {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new NotFoundError("Order not found");
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: order.totalAmount * 100, // Amount in paise
            currency: "INR",
            receipt: `order_${order._id}`,
        });

        // Attach paymentId to order
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

        // Update order status
        const order = await Order.findOne({ paymentId: razorpay_order_id });
        if (!order) {
            throw new NotFoundError("Order not found");
        }

        order.paymentStatus = "Paid";
        await order.save();
        const jewellery=order.jewelleryId;
        if(!jewellery){
            throw new NotFoundError("Jewellery not found");
        }
        jewellery.orders.push(order._id);
        await jewellery.save();

        return { message: "Payment successful", order };
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
        const orders = await Order.find({ userId});
        return orders;
};

// Get a single order by ID
const getOrderById = async (orderId) => {
        const order = await Order.findById(orderId).populate("items.jewelleryId");
        if (!order){
            throw new NotFoundError("Order not found");
        } 
        return order;
};

// Update order status
const updateOrderStatus = async (orderId, orderData) => {
        const { status } = orderData;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order){
            throw new NotFoundError("Order not found");
        } 
        return order;
};

// Delete an order
const deleteOrder = async (orderId) => {
        if (!order){
            throw new NotFoundError("Order not found");
        } 
        const order = await Order.findByIdAndDelete(orderId);
        return { message: "Order deleted successfully", order };
};

module.exports={createOrder, initiatePayment, verifyPayment, getOrderById, getOrdersByUserId, updateOrderStatus, deleteOrder};


