import userService from "#services/user/userService.js";

export const getCurrentUser = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const userId = req.user._id;
    const user = await userService.getCurrent(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
