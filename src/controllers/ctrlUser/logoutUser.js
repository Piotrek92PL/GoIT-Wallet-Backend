import userService from "#services/user/userService.js";

export const logout = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = req.user._id;
  try {
    await userService.logoutUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
