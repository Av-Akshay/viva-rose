const express = require("express");
const jewelleryController = require("../controllers/jewellery.controller.js");
const auth = require("../middlewares/auth.js");
const {upload} =require("../middlewares/multer.js");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jewellery
 *   description: Jewellery management and operations
 */

/**
 * @swagger
 * /jewellery/add:
 *   post:
 *     summary: Create a new jewellery
 *     tags: [Jewellery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryName:
 *                 type: string
 *               genderCategory:
 *                 type: string
 *               jewelleryType:
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
 *         description: Jewellery created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", upload, auth, jewelleryController.createJewellery);


/**
 * @swagger
 * /jewellery/{id}:
 *   get:
 *     summary: Get a jewellery by its ID
 *     tags: [Jewellery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jewellery data
 *       404:
 *         description: Jewellery not found
 */
router.get("/:id", jewelleryController.getJewelleryById);

/**
 * @swagger
 * /jewellery/{id}:
 *   put:
 *     summary: Update a jewellery by its ID
 *     tags: [Jewellery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jewelleryName:
 *                 type: string
 *               material:
 *                 type: string
 *               genderCategory:
 *                 type: string
 *               jewelleryType:
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
 *       200:
 *         description: Jewellery updated successfully
 *       404:
 *         description: Jewellery not found
 */
router.put("/:id", upload, auth, jewelleryController.updateJewellery);

/**
 * @swagger
 * /jewellery/{id}:
 *   delete:
 *     summary: Delete a jewellery by its ID
 *     tags: [Jewellery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jewellery deleted successfully
 *       404:
 *         description: Jewellery not found
 */
router.delete("/:id", auth, jewelleryController.deleteJewellery);

module.exports = router;
