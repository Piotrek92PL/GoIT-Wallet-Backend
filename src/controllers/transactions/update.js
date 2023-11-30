// import * as services from "#services/contacts/index.js";

export const update = async (req, res, next) => {
  return res.status(202).json({
    status: 202,
    message: `Endpoint not in service - work in progress.`,
    data: {},
  });
  // try {
  //   const { name, email, phone, favorite } = req.body;
  //   const contactId = req.params.id;
  //   const userId = req.user.id;

  //   if (services.validateContact(req.body)) {
  //     const newData = {
  //       name,
  //       email,
  //       phone,
  //       favorite,
  //     };
  //     const updated = await services.updateContact({
  //       userId,
  //       contactId,
  //       newData,
  //     });
  //     if (updated) {
  //       return res.json({
  //         status: 200,
  //         data: updated,
  //       });
  //     }

  //     return res.status(404).json({
  //       status: 404,
  //       message: `[${contactId}] Not found. Could not update`,
  //     });
  //   }

  //   return res.status(400).json({
  //     status: 400,
  //     message: "missing required fields",
  //   });
  // } catch (err) {
  //   return res.status(500).json({
  //     status: 500,
  //     message: `Internal server error: ${err}`,
  //   });
  // }
};
