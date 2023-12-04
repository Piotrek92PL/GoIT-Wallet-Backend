import Transaction from "#models/transaction.model.js";
import mongoose from "mongoose"; //do usuniecia
import { getValidCategoryNum } from "#validators/getValidCategoryNum.js";
// import * as userServices from "#services/user/index.js"; //do wstawienia

export const addTransaction = async ({
  date,
  type,
  category,
  comment,
  amount,
  userId,
}) => {
  const transaction = {
    date,
    type,
    category: await getValidCategoryNum(category),
    comment,
    amount,
    owner: new mongoose.Types.ObjectId(userId), //do usuniecia
    // owner: await userServices.getById(userId), //do wstawienia
  };
  const newTransaction = await Transaction.create(transaction);
  return newTransaction;
};
