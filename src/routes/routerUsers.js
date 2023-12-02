import express from "express";
import passport from "passport";

import { register } from "#ctrlUser/registerUser.js";
import { login } from "#ctrlUser/loginUser.js";
import { logout } from "#ctrlUser/logoutUser.js";
import { getCurrentUser } from "#ctrlUser/getCurrentUser.js";
import { validateUserQuery } from "#validators/userQueryValidator.js";

const routerUsers = express.Router();

routerUsers.post("/signup", validateUserQuery, register);

routerUsers.post("/login", validateUserQuery, login);

routerUsers.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

routerUsers.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

export default routerUsers;
