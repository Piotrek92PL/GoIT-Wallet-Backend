import mongoose from "mongoose";
import Transaction from "#models/transaction.model.js";
import { getValidCategoryNum } from "#validators/getValidCategoryNum.js";

export const updateTransaction = async ({ transactionId, userId, newData }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
  const filter = { _id: transactionObjectId, owner: userObjectId };
  const { category } = newData;
  const validatedData = category
    ? { ...newData, category: await getValidCategoryNum(category) }
    : newData;
  return Transaction.findOneAndUpdate(filter, validatedData, { new: true });
};
