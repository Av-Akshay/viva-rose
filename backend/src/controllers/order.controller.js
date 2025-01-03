const orderService = require("../services/order.service.js");

// Create an order from the cart
const createOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);

        // Create an order
        const order = new Order({
            userId,
            items: cart.items,
            totalAmount,
        });

        await order.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Initiate Razorpay payment
const initiatePayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
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

        res.status(200).json({ razorpayOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Razorpay payment
const verifyPayment = async (req, res) => {
    const crypto = require("crypto");
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Update order status
        const order = await Order.findOne({ paymentId: razorpay_order_id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.paymentStatus = "Paid";
        await order.save();

        res.status(200).json({ message: "Payment successful", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for a user
const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("items.productId");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
