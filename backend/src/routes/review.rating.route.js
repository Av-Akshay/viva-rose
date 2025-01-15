const express = require("express");
const reviewRatingController = require("../controllers/review.rating.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadReviewImage}= require("../middlewares/multer.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Review Rating
 *   description: Review Rating Management
 */

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: Create a new review
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 enum: ['5','4','3','2','1']
 *               reviewText:
 *                 type: string
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the property (up to 10 images).
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", uploadReviewImage, auth, reviewRatingController.createReviewRating);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by its ID
 *     tags: [Review Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review data
 *       404:
 *         description: Review not found
 */
router.get("/:id", reviewRatingController.getReviewById);

/**
 * @swagger
 * /reviews/jewelleryId:
 *   get:
 *     summary: Get a review by Jewellery ID
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review data
 *       404:
 *         description: Review not found
 */
router.get("/jewelleryId", reviewRatingController.getReviewsByJewellery);

/**
 * @swagger
 * /reviews/update:
 *   put:
 *     summary: Update a review by its ID
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 enum: ['5','4','3','2','1']
 *               reviewText:
 *                 type: string
 *               reviewImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the property (up to 10 images).
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.put("/:id", auth, reviewRatingController.updateReview);

/**
 * @swagger
 * /reviews/delete:
 *   delete:
 *     summary: Delete a review by its ID
 *     tags: [Review Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", auth, reviewRatingController.deleteReview);

module.exports = router;
