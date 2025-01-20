const express = require("express");
const orderController = require("../controllers/order.controller.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User Order Management
 */

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Retrieve all orders for a user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: A list of orders.
 *       404:
 *         description: Orders not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/user/:userId", orderController.getOrdersByUserId);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Retrieve a specific order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 */
router.get("/:orderId", orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order from the user's cart.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or items not found.
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /orders/{orderId}/payment:
 *   post:
 *     summary: Initiate payment for an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Payment initiated successfully.
 *       404:
 *         description: Order not found.
 */
router.post("/:orderId/payment", orderController.initiatePayment);

/**
 * @swagger
 * /orders/payment/verify:
 *   post:
 *     summary: Verify a Razorpay payment.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *       400:
 *         description: Payment verification failed.
 *       404:
 *         description: Order not found.
 */
router.post("/payment/verify", orderController.verifyPayment);

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Update the status of an order.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Completed", "Cancelled", "Refund"]
 *                 description: The new status of the order.
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       404:
 *         description: Order not found.
 */
router.put("/:orderId", orderController.updateOrderStatus);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Delete an order by ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order.
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       404:
 *         description: Order not found.
 */
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;