import userService from "#services/user/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.registerUser({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    await userService.updateToken(user._id, token);

    res.status(201).json({
      user: {
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
