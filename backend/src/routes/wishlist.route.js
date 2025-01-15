const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Wishlist Jewellerys
 *     description: Retrieve a list of jewellerys
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of properties retrieved successfully
 *       404:
 *         description: No properties found matching the criteria
 */
router.get('/', auth, userController.wishlistJewellery);

/**
 * @swagger
 * /wishlist/add-jewellery:
 *   post:
 *     summary: Add a jewellery to user's wishlist
 *     description: Adds a jewellery to the user's wishlist list
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryId:
 *                 type: string
 *                 description: JewelleryId
 *     responses:
 *       200:
 *         description: Jewellery added to wishlist successfully
 *       404:
 *         description: User or Jewellery not found
 *       500:
 *         description: Internal server error
 */
router.post('/add-jewellery', auth, userController.addWishlistJewellery);

/**
 * @swagger
 * /wishlist/remove-jewellery:
 *   delete:
 *     summary: Remove a jewellery from user's wishlist
 *     description: Removes a jewellery from the user's wishlist
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryId:
 *                 type: string
 *                 description: JewelleryId
 *     responses:
 *       200:
 *         description: Jewellery removed from wishlist successfully
 *       404:
 *         description: User or Jewellery not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove-jewellery',auth, userController.removeWishlistJewellery);

module.exports = router;


