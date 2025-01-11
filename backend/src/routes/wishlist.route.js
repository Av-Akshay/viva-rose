const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Wishlist Products
 *     description: Retrieve a list of products
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of properties retrieved successfully
 *       404:
 *         description: No properties found matching the criteria
 */
router.get('/',auth, userController.wishlistProduct);

/**
 * @swagger
 * /wishlist/add-product:
 *   post:
 *     summary: Add a product to user's wishlist
 *     description: Adds a product to the user's wishlist list
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ProductId
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/add-product', auth, userController.addWishlistProduct);

/**
 * @swagger
 * /wishlist/remove-product:
 *   delete:
 *     summary: Remove a product from user's wishlist
 *     description: Removes a product from the user's wishlist
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ProductId
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove-product',auth, userController.removeWishlistProduct);

module.exports = router;


