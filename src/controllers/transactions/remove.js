import * as services from "#services/transactions/index.js";

export const remove = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const { userId } = req.body; //do usuniecia
    // const userId = req.user.id;//do wstawienia jak bedziemy miec auth
    const deleted = await services.removeTransaction({ transactionId, userId });

    if (deleted) {
      return res.json({
        status: 200,
        message: "Transaction deleted",
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${transactionId}] Not found. Could not delete`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
