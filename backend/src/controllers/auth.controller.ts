import User from "../models/user.model";
import { NextFunction, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import { RequestWithProfile, RequestWithAuth } from "../types";
import config from "../config/config";
const { jwtSecret } = config;
import bcrypt from "bcrypt";
import pool from "../db";
require("dotenv").config();
// const signin: RequestHandler = async (req, res) => {
//   try {
//     const { email, password, _id, name } = req.body; // destructuring the email and password from the request body
//     const user = await User.findOne({ email }); // find the user by email
//     if (!user) return res.status(401).json({ error: "User not found" }); // if the user is not found

//     if (!user.authenticate(password))
//       // if tpassword dont match
//       return res.status(401).json({ error: "Email and password don't match" });

//     const token = jwt.sign({ _id }, jwtSecret); // create a token with the user id and the secret

//     res.cookie("t", token, { expires: new Date(Date.now() + 9999) }); // set a cookie with the token for the user to use it in the client side
//     user.hashed_password = undefined; // remove the password from the user object
//     user.salt = undefined; // remove the salt from the user object
//     return res.json({
//       token,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "Could not sign in" });
//   }
// };
const authenticate = async (password, hashed_password) => {
  return await bcrypt.compare(password, hashed_password);
};
const signin: RequestHandler = async (req, res) => {
  try {
    const { email, password, _id } = req.body; // destructuring the email and password from the request body
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]); // find the user by email
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "User not found" }); // if the user is not found
    const { hashed_password } = user;
    if (!(await authenticate(password, hashed_password)))
      // if tpassword dont match
      return res.status(401).json({ error: "Email and password don't match" });

    const token = jwt.sign({ _id }, jwtSecret); // create a token with the user id and the secret

    res.cookie("t", token, { expires: new Date(Date.now() + 9999) }); // set a cookie with the token for the user to use it in the client side
    user.hashed_password = undefined; // remove the password from the user object
    user.salt = undefined; // remove the salt from the user object
    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Could not sign in" });
  }
};
// the use of cookies is optional, It is only used if cookies are used in the client side
const signout: RequestHandler = async (req, res) => {
  res.clearCookie("t"); // clear the cookie with the "t" name
  return res.status(200).json({ message: "signed out" });
};

const requireSignin = expressJwt({
  algorithms: ["HS256"],
  secret: jwtSecret,
  userProperty: "auth",
});
// const requireSignin = (
//   req: RequestWithAuth & RequestWithProfile,
//   res: Response,
//   next: NextFunction
// ) => {
//   const jwtToken = req.header("token");
//   const payload = jwt.verify(jwtToken as string, jwtSecret);
//   console.log(payload, "payload");
//   req.auth = payload;
//   next();
// }; // por alguna razon esto da lo mismo que el de arriba

const hasAuthorization = (
  req: RequestWithAuth & RequestWithProfile,
  res: Response,
  next: NextFunction
) => {
  // req.auth was created by the requireSignin middleware after authenticating the user with the secret, the req.profile was created by the userById middleware in user.controller.ts, with this two, we first verify that the profile and the auth exits, if they do, we check that the profile._id is the same as the auth._id, if they are the same, we allow the user to continue, if they are not the same, we return an error
  console.log(req.auth, "auth user");
  const authorized =
    req.profile && req.auth; /**&& req.profile._id == req.auth._id */
  if (!authorized)
    return res.status(403).json({ error: "User is not authorized" });
  next();
};

export { signin, signout, requireSignin, hasAuthorization };
