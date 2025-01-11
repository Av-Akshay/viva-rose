const express = require("express");
const productController = require("../controllers/product.controller.js");
const router = express.Router();

/**
 * @swagger
 * /jewellery:
 *   get:
 *     summary: Search for products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: productCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *       - in: query
 *         name: productType
 *         schema:
 *           type: string
 *           enum: ['necklaces','pendents','rings','earings','bracelets','anklets','toe rings','religious jewellery']
 *       - in: query
 *         name: availability
 *         schema:
 *           type: string
 *           enum: ['exclude out of stock']
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: 
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, rating]
 *         description: Sort properties by expected price and rating
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [Low to High, High to Low]
 *         description: Order of sorting (asc for ascending, desc for descending)
 *     responses:
 *       200:
 *         description: List of products matching the criteria
 *       404:
 *         description: No products found
 */
router.get("/", productController.searchProducts);

module.exports = router;
