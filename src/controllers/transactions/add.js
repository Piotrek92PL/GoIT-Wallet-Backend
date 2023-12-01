// import * as services from "#services/contacts/index.js";

export const add = async (req, res, next) => {
  // return res.status(202).json({
  //   status: 202,
  //   message: `Endpoint not in service - work in progress.`,
  // });
  try {
    const { name, email, phone, favorite } = req.body;
    const userId = req.user.id;

    if (services.validateContact(req.body)) {
      const result = await services.addContact({
        name,
        email,
        phone,
        favorite,
        userId,
      });
      return res.json({
        status: 200,
        data: result["_id"],
      });
    }
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
