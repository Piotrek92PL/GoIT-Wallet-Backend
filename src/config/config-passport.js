import passport from "passport";
import passportJWT from "passport-jwt";
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

passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Not authorized" });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
