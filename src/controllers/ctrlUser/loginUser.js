import userService from "#services/user/userService.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    await userService.updateToken(user._id, token);

    res.json({
      token,
      user: { email: user.email },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
