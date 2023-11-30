// import * as services from "#services/contacts/index.js";

export const getById = async (req, res, next) => {  
  return res.status(202).json({
    status: 202,
    message: `Endpoint not in service - work in progress.`,
    data: {},
  });
  // try {
  //   const contactId = req.params.id;
  //   const userId = req.user.id;
  //   const contact = await services.getById({ userId, contactId });

  //   if (contact) {
  //     return res.json({
  //       status: 200,
  //       data: contact,
  //     });
  //   }
  //   return res.status(404).json({
  //     status: 404,
  //     message: `[${contactId}] Not found.`,
  //   });
  // } catch (err) {
  //   return res.status(500).json({
  //     status: 500,
  //     message: `Internal server error: ${err}`,
  //   });
  // }
};
