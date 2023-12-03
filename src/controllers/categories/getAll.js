import * as services from "#services/categories/index.js";

export const getAll = async (req, res, next) => {
  try {
    const categories = await services.getCategories();
    return res.json({
      status: 200,
      data: [...categories],
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${err}`,
    });
  }
};
