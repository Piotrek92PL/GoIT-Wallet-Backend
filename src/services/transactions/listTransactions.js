import mongoose from "mongoose";
import Transaction from "#models/transaction.model.js";

export const listTransactions = async ({ userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return Transaction.find({ owner: userObjectId });
};
