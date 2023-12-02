import mongoose from "mongoose";
import Transaction from "#models/transaction.model.js";

export const updateTransaction = ({ transactionId, userId, newData }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
  const filter = { _id: transactionObjectId, owner: userObjectId };
  return Transaction.findOneAndUpdate(filter, newData, { new: true });
};
