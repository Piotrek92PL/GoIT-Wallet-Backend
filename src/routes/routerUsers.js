import express from "express";
import passport from "passport";

import { register } from "#ctrlUser/registerUser.js";
import { login } from "#ctrlUser/loginUser.js";
import { logout } from "#ctrlUser/logoutUser.js";
import { getCurrentUser } from "#ctrlUser/getCurrentUser.js";
import { validateUserQuery } from "#validators/userQueryValidator.js";
import { jwtAuth } from "#services/auth/jwtAuth.js";

const routerUsers = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user.
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *           examples:
 *             duplicate_example:
 *               value:
 *                 email: "gooduser@example.com"
 *                 password: "GoodPwd@123"
 *             bad_password_example:
 *               value:
 *                 email: "baduser@example.com"
 *                 password: "badpassword"
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Invalid input.
 *       409:
 *         description: Email in use
 */
routerUsers.post("/signup", validateUserQuery, register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login.
 *     description: Logs in a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: GoodPassword@123
 *           examples:
 *             valid_credentials:
 *               value:
 *                 email: "gooduser@example.com"
 *                 password: "GoodPwd@123"
 *             invalid_credentials:
 *               value:
 *                 email: "invaliduser@example.com"
 *                 password: "BadPwd@123"
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       401:
 *         description: Unauthorized.
 */
routerUsers.post("/login", validateUserQuery, login);

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Log out a user.
 *     description: Logs out a user by removing their authentication token.
 *     responses:
 *       204:
 *         description: Successfully logged out.
 *       401:
 *         description: Unauthorized or not logged in.
 */
routerUsers.get("/logout", jwtAuth, logout);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get current user data.
 *     description: Retrieves the currently logged-in user's data.
 *     responses:
 *       200:
 *         description: Information about the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 // Include other user properties here if applicable
 *       401:
 *         description: Unauthorized or not logged in.
 */
routerUsers.get("/current", jwtAuth, getCurrentUser);

export default routerUsers;
