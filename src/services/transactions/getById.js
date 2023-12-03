import mongoose from "mongoose";
import Transaction from "#models/transaction.model.js";

export const getById = async ({ transactionId, userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return Transaction.find({ _id: transactionId, owner: userObjectId });
};
