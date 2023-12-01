// import { transaction } from "#models/transaction.js";
// import * as userServices from "#services/user/index.js";

import { now } from "mongoose";

export const addTransaction = async ({
  date = now(),
  type,
  category,
  comment,
  sum,
}) => {
  return null;
  const transaction = {
    date,
    type,
    category,
    comment,
    sum,
    // owner: await userServices.getById(userId),
  };
  const newTransaction = await transaction.create(transaction);
  return newTransaction;
};
