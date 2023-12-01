import transactionModel from "#models/transaction.model.js";
// import * as userServices from "#services/user/index.js";

export const addTransaction = async ({
  date,
  type,
  category,
  comment,
  amount,
}) => {
  // return null;
  const transaction = {
    date,
    type,
    category,
    comment,
    amount,
    // owner: await userServices.getById(userId),
  };
  const newTransaction = await transactionModel.create(transaction);
  return newTransaction;
};
