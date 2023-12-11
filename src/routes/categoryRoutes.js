import express from "express";
import * as categoriesController from "#controllers/categories/index.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API operations related to categories
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories of transactions.
 *     description: Returns a list of all categories. Also creates a default list in MongoDB if there was no list of categories.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of categories.
 */
router.get("/", categoriesController.getAll);

export default router;
