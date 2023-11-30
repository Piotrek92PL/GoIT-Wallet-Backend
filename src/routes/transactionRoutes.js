import express from "express";
import * as transactionController from "#controllers/transactions/index.js";
const router = express.Router();

router.get("/", transactionController.getAll);

router.get("/:id", transactionController.getById);

router.post("/", transactionController.add);

router.put("/:id", transactionController.update);

export default router;
