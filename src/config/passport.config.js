import passport from "passport";
import jwt from "passport-jwt";
import Users from "../dao/dbManagers/users.js";
import config from "./config.js";

const userManager = new Users();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.private_key,
      },
      async (jwt_payload, done) => {
        try {
          if (!jwt_payload.user)
            return done(null, false, { messages: "Invalid credentials!" });

          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.findById(id);
    done(null, user);
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[config.cookie_name];
  }
  return token;
};

export default initializePassport;
