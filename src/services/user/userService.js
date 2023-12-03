import User from "#models/user.js";

import bcrypt from "bcryptjs";

const registerUser = async (userData) => {
  const newUser = new User({
    ...userData,
    verify: false,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }

  return newUser;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return null;
  }
  user.verificationToken = null;
  user.verify = true;
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const validateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

const updateToken = async (userId, token) => {
  return User.findByIdAndUpdate(userId, { token }, { new: true });
};

const logoutUser = async (userId) => {
  return updateToken(userId, null);
};

const getCurrent = async (userId) => {
  return User.findById(userId, "-password -token");
};

export default {
  registerUser,
  verifyUser,
  findUserByEmail,
  validateUser,
  updateToken,
  logoutUser,
  getCurrent,
};
