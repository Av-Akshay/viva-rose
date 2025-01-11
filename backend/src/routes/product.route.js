const express = require("express");
const productController = require("../controllers/product.controller.js");
const auth = require("../middlewares/auth.js");
const {upload} =require("../middlewares/multer.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and operations
 */

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               genderCategory:
 *                 type: string
 *               productType:
 *                 type: string
 *                 enum: ['necklaces','pendents','rings','earings','bracelets','anklets','toe rings','religious jewellery']
 *               colour:
 *                 type: string
 *               materialWeight:
 *                 type: number
 *               stockCount:
 *                 type: number
 *               price:
 *                 type: number
 *               stockStatus:
 *                 type: string
 *                 enum: ['in-stock','out-of-stock']
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images of the property (up to 10 images).
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", upload, auth, productController.createProduct);


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productCode:
 *                 type: string
 *               productName:
 *                 type: string
 *               genderCategory:
 *                 type: string
 *               productType:
 *                 type: string
 *               materialWeight:
 *                 type: number
 *               stockCount:
 *                 type: number
 *               price:
 *                 type: number
 *               stockStatus:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", auth, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/", auth, productController.deleteProduct);

module.exports = router;
