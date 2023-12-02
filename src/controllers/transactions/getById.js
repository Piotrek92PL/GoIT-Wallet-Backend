import * as services from "#services/transactions/index.js";

export const getById = async (req, res, next) => {
  // return res.status(202).json({
  //   status: 202,
  //   message: `Endpoint not in service - work in progress.`,
  //   data: {},
  // });
  try {
    const transactionId = req.params.id;
    const { userId } = req.body; //do usuniecia
    // const userId = req.user.id;//do wstawienia jak bedziemy miec auth
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
