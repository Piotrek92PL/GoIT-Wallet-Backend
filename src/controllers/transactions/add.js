import * as services from "#services/transactions/index.js";

export const add = async (req, res, next) => {
  try {
    const { date, type, category, comment, amount, userId } = req.body; //usunac z tad userId
    // const userId = req.user.id; //do wstawienia jak bedziemy miec auth

    // if (validateTransaction(req.body)) { //validator do zrobienia
    const result = await services.addTransaction({
      date,
      type,
      category,
      comment,
      amount,
      userId,
    });
    return res.json({
      status: 200,
      data: result["_id"],
    });
    // } //validacja nieudana:
    return res.status(400).json({
      status: 400,
      message: "Missing required field",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
