// import * as services from "#services/contacts/index.js";

export const getAll = async (req, res, next) => {
  return res.status(202).json({
    status: 202,
    message: `Endpoint not in service - work in progress.`,
    data: [],
  });
  // try {
  //   const userId = req.user.id;
  //   const contacts = await services.listContacts({ userId });
  //   return res.json({
  //     status: 200,
  //     data: [...contacts],
  //   });
  // } catch (err) {
  //   return res.status(500).json({
  //     status: 500,
  //     message: `Internal server error: ${err}`,
  //   });
  // }
};
