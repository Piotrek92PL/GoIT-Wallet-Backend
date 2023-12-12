import express from "express";
import * as transactionController from "#controllers/transactions/index.js";
import { jwtAuth } from "#services/auth/jwtAuth.js";
const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions.
 *     description: Returns a list of all transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               data:
 *                 - transaction1
 *                 - transaction2
 *                 - transaction3
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error: [error_message]"
 */
router.get("/", jwtAuth, transactionController.getAll);

/**
  * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID.
 *     description: Returns a single transaction by ID.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
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
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               data: "transaction_details"
 *       404:
 *         description: Transaction not found.
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "[transactionId] Not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error: [error_message]"
 */
router.get("/:id", jwtAuth, transactionController.getById);

/**
* @swagger
 * /api/transactions/stats/{userId}/{year}/{month}:
 *   get:
 *     summary: Get detailed user's transactions statistics for a specific month and year.
 *     description: Returns detailed statistics including all transactions for the given month and year.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID.
 *       - in: path
 *         name: year
 *         schema:
 *           type: number
 *         required: true
 *         description: Year of the transactions.
 *       - in: path
 *         name: month
 *         schema:
 *           type: number
 *         required: true
 *         description: Month of the transactions.
 *     responses:
 *       200:
 *         description: Detailed statistics of user's transactions.
 *         content:
 *           application/json:
 *             example:
 *               transactions:
 *                 - transaction1
 *                 - transaction2
 *               sumOfIncome: 1000.00
 *               sumOfExpense: 500.00
 *       400:
 *         description: Invalid year or month.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid year or month"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error: [error_message]"
 */
router.get("/stats/:userId/:year/:month", jwtAuth, transactionController.getUserStatisticsByDate);


/**
   * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a new transaction.
 *     description: Adds a new transaction to the list.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               type:
 *                 type: string
 *                 example: "expense"
 *               category:
 *                 type: string
 *                 example: "Groceries"
 *               comment:
 *                 type: string
 *                 example: "Monthly grocery shopping"
 *               amount:
 *                 type: number
 *                 example: 50.00
*               userId:
 *                 type: string
 *                 example: "user123"
 *           examples:
 *             valid_transaction:
 *               value:
 *                 date: "2023-01-01"
 *                 type: "expense"
 *                 category: "Household Products"
 *                 comment: "Monthly grocery shopping"
 *                 amount: 50.00
*                 userId: "user123"
 *             invalid_transaction:
 *               value:
 *                 date: "2023-01-01"
 *                 type: "expense"
 *                 comment: "Monthly grocery shopping"
*                 userId: "user123"
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               data: "transaction_id"
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Invalid transaction data"
 *               errors:
 *                 - "Invalid date format"
 *                 - "Invalid type, must be either income or expense"
 *                 - "Invalid category, must be a positive number"
 *                 - "Invalid amount, must be a positive number"
 *                 - "Comment must be a string"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error: [error_message]"
 */
router.post("/", jwtAuth, transactionController.add);

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
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               type:
 *                 type: string
 *                 example: "income"
 *               category:
 *                 type: string
 *                 example: "Salary"
 *               comment:
 *                 type: string
 *                 example: "Monthly salary deposit"
 *               amount:
 *                 type: number
 *                 example: 3000.00
 *               userId:
 *                 type: string
 *                 example: "user123"
 *           examples:
 *             valid_update:
 *               value:
 *                 date: "2023-01-01"
 *                 type: "income"
 *                 category: "Salary"
 *                 comment: "Monthly salary deposit"
 *                 amount: 3000.00
 *                 userId: "user123"
 *             invalid_update:
 *               value:
 *                 date: "2023-01-01"  
 *                 comment: "Monthly salary deposit"
 *                 amount: 3000.00
 *                 userId: "user123"
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *       404:
 *         description: Transaction not found.
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             examples:
 *               missing_field:
 *                 value:
 *                   status: 400
 *                   message: "Missing required field"
 */
router.put("/:id", jwtAuth, transactionController.update);
/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Remove a transaction by ID.
 *     description: Removes a transaction by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction ID.
 *     responses:
 *       200:
 *         description: Transaction deleted successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             examples:
 *               delete_success:
 *                 value:
 *                   status: 200
 *                   message: "Transaction deleted successfully."
 *               not_found:
 *                 value:
 *                   status: 404
 *                   message: "Transaction not found."
 *               internal_error:
 *                 value:
 *                   status: 500
 *                   message: "Internal server error: [error_message]"
 *           application/xml:
 *             examples:
 *               delete_success:
 *                 value:
 *                   status: 200
 *                   message: "Transaction deleted successfully."
 *               not_found:
 *                 value:
 *                   status: 404
 *                   message: "Transaction not found."
 *               internal_error:
 *                 value:
 *                   status: 500
 *                   message: "Internal server error: [error_message]"
 */
router.delete("/:id", jwtAuth, transactionController.remove);

export default router;
