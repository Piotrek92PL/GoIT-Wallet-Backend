import express from "express";
import * as transactionController from "#controllers/transactions/index.js";
const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions.
 *     description: Returns a list of all transactions.
 *     responses:
 *       200:
 *         description: A list of transactions.
 */
router.get("/", transactionController.getAll);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID.
 *     description: Returns a single transaction by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction ID.
 *     responses:
 *       200:
 *         description: A single transaction.
 *       404:
 *         description: Transaction not found.
 */
router.get("/:id", transactionController.getById);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a new transaction.
 *     description: Adds a new transaction to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your transaction properties here.
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *       400:
 *         description: Invalid request body.
 */
router.post("/", transactionController.add);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID.
 *     description: Updates a transaction by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your updated transaction properties here.
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *       404:
 *         description: Transaction not found.
 *       400:
 *         description: Invalid request body.
 */
router.put("/:id", transactionController.update);

export default router;
