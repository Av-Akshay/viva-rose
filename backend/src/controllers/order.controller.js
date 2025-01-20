const orderService = require("../services/order.service.js");
const logger = require("../configs/winston.config.js");

// Create an order from the cart
const createOrder = async (req, res, next) => {
    try{
        const {message, order}= await orderService.createOrder(req.body.userId);
        res.status(201).json({ message, order });
    } catch (error) {
        next(error);
    }
};

// Initiate Razorpay payment
const initiatePayment = async (req, res, next) => {
    try {
        const razorpayOrder= await orderService.initiatePayment(req.body.orderId);
        res.status(200).json({ razorpayOrder });
    } catch (error) {
         next(error);
    }
};

// Verify Razorpay payment
const verifyPayment = async (req, res, next) => {
    try {
        const { message, order }= await orderService.verifyPayment(req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature);
        res.status(200).json({ message, order });
    } catch (error) {
         next(error);
    }
};

// Get all orders for a user
const getOrdersByUserId = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.params.userId);
        res.status(200).json(orders);
    } catch (error) {
         next(error);
    }
};

// Get a single order by ID
const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
         next(error);
    }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.orderId, req.body);
        res.status(200).json(order);
    } catch (error) {
         next(error);
    }
};

// Delete an order
const deleteOrder = async (req, res, next) => {
    try {
        const { message, order } = await orderService.deleteOrder(req.params.orderId);
        res.status(200).json({ message, order });
    } catch (error) {
         next(error);
    }
};

module.exports={createOrder, initiatePayment, verifyPayment, getOrderById, getOrdersByUserId, updateOrderStatus, deleteOrder};
