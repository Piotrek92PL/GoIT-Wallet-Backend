import passport from "passport";
import passportJWT from "passport-jwt";
import JWT from "jsonwebtoken";
import User from "#models/user.js";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const verification = async (decodedToken, done) => {
  try {
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return done(new Error("Unauthorized"));
    }
    const userToken = JWT.verify(user.token, secret);
    if (userToken.iat !== decodedToken.iat) {
      throw new Error("Unauthorized");
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

// JWT Strategy
passport.use(new Strategy(params, verification));
