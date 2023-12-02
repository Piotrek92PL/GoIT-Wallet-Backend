import * as services from "#services/transactions/index.js";

export const update = async (req, res, next) => {
  try {
    const { date, type, category, comment, amount, userId } = req.body; //usunac z tad userId
    const transactionId = req.params.id;
    // const userId = req.user.id;//do wstawienia jak bedziemy miec auth

    // if (services.validateTransaction(req.body)) { //validacja
    const newData = {
      date,
      type,
      category,
      comment,
      amount,
      userId,
    };
    const updated = await services.updateTransaction({
      userId,
      transactionId,
      newData,
    });
    if (updated) {
      return res.json({
        status: 200,
        data: updated,
      });
    }

    return res.status(404).json({
      status: 404,
      message: `[${transactionId}] Not found. Could not update`,
    });
    // } //validacja niepoprawna:

    return res.status(400).json({
      status: 400,
      message: "missing required fields",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
