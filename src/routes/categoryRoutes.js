import express from "express";
import * as categoriesController from "#controllers/categories/index.js";
const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all categories of transactions.
 *     description: Returns a list of all categories. Also creates default list in mongodb if there was no list of categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 */
router.get("/", categoriesController.getAll);

export default router;
