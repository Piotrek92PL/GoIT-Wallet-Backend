import * as services from "#services/transactions/index.js";

export const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const transactions = await services.listTransactions({ userId });
    return res.json({
      status: 200,
      data: [...transactions],
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
