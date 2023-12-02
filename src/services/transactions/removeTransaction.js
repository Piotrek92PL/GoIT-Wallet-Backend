import mongoose from "mongoose";
import Transaction from "#models/transaction.model.js";

export const removeTransaction = async ({ transactionId, userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const transactionObjectId = new mongoose.Types.ObjectId(contactId);
  const filter = { _id: transactionObjectId, owner: userObjectId };
  const deleted = await Transaction.deleteOne(filter);
  return deleted ? deleted.deletedCount > 0 : null;
};
