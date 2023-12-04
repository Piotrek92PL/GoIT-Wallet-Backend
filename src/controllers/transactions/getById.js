import * as services from "#services/transactions/index.js";

export const getById = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id; 
    const transaction = await services.getById({ userId, transactionId });

    if (transaction) {
      return res.json({
        status: 200,
        data: transaction,
      });
    }
    return res.status(404).json({
      status: 404,
      message: `[${transactionId}] Not found.`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
