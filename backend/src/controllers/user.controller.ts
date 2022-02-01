import User from "../models/user.model";
import extend from "lodash/extend";
import dbErrorHandler from "../middleware/dbErrorHandler";
import { RequestHandler, Response, Request, NextFunction } from "express";
import { RequestWithProfile } from "../types";
import pool from "../db";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";

const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return [await bcrypt.hash(password, salt), salt];
};

// const create: RequestHandler = async (req, res, next) => {
//   const { body } = req;
//   const user = new User(body);
//   try {
//     const newUser = await user.save();
//     newUser.hashed_password = undefined;
//     newUser.salt = undefined;
//     return res
//       .status(200)
//       .json({ message: "Successfully signed up!", newUser });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       error: dbErrorHandler.getErrorMessage(error),
//     });
//   }
// };

const create: RequestHandler = async (req, res, next) => {
  const { body } = req;
  const { name, email, password } = body;
  try {
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const bcryptPassword = await bcrypt.hash(password, salt);
    const [bcryptPassword, salt] = await encryptPassword(password);
    //4. enter the user in the database
    const { rows: newUser } = await pool.query(
      "INSERT INTO users (name, email, hashed_password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword, salt]
    );
    newUser[0].hashed_password = undefined;
    newUser[0].salt = undefined;
    return res
      .status(200)
      .json({ message: "Successfully signed up!", newUser: newUser[0] });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};
// const list: RequestHandler = async (_, res) => {
//   try {
//     const users = await User.find().select("name email updated created"); // find all users, and only select the name, email, updated and created fields, this filter also will be applied when retrieving a single user by id
//     return res.json(users);
//   } catch (error) {
//     return res.status(400).json({
//       error: dbErrorHandler.getErrorMessage(error),
//     });
//   }
// };
const list: RequestHandler = async (_req, res) => {
  try {
    let { rows: users } = await pool.query(
      "SELECT _id, name, email, updated, created FROM users"
    );
    users = users.map((user) => {
      if (!user.updated) delete user.updated;
      return user;
    });
    return res.json(users);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// const userById = async (
//   req: RequestWithProfile,
//   res: Response,
//   next: NextFunction,
//   id: any
// ) => {
//   try {
//     const user = await User.findById(id); // find the user by id
//     // console.log(user, "this is from userById");

//     if (!user) {
//       // if the user is not found
//       return res.status(400).json({
//         // return a status code of 400 and a message
//         error: "User not found",
//       });
//     }
//     req.profile = user; // add the user to the request object
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       error: dbErrorHandler.getErrorMessage(error) || error,
//     });
//   }
// }; 61e17198d29ab06ac574166b

const userById = async (
  req: RequestWithProfile,
  res: Response,
  next: NextFunction,
  userId: any // this is where the parameter is passed, you can name it anything
) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE _id = $1", [
      userId,
    ]);
    // console.log(user, "this is from userById");
    const user = rows[0];
    // console.log(user);
    if (!user) {
      // if the user is not found
      return res.status(400).json({
        // return a status code of 400 and a message
        error: "User not found",
      });
    }
    if (!user.updated) delete user.updated;
    req.profile = user; // add the user to the request object
    // console.log(req.user, "para comprobar que existe");
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const read = (req: RequestWithProfile, res: Response) => {
  const { profile } = req; // destructuring the profile from the request object
  if (!profile) return res.json({ error: "User not found" }); // if the profile is not found
  profile.hashed_password = undefined; // remove the hashed password from the response
  profile.salt = undefined; // remove the salt from the response
  return res.json(profile); // return the profile
};

// const update = async (req: RequestWithProfile, res: Response) => {
//   try {
//     let user = req.profile; // get the user from the request object
//     const { body } = req; // get the body from the request object
//     // update the user with the new values
//     extend(user, body); // extend the user with the new values, if a value in body already exists, it will be overwritten in the user object
//     // console.log(req.body);
//     // user = Object.assign(user, body); // assign the new values to the user object
//     // console.log(user);

//     if (!user) return res.status(400).json({ error: "User not found" });
//     user.updated = Date.now();
//     const updatedUser = await user.save(); // this will only save the properties that are in the mongooose schema, so if you add a property c to a schema {a,b}
//     updatedUser.hashed_password = undefined;
//     // console.log(updatedUser);
//     updatedUser.salt = undefined;
//     return res.json(updatedUser);
//   } catch (error) {
//     return res.status(400).json({
//       error: dbErrorHandler.getErrorMessage(error),
//     });
//   }
// };
const update = async (req: RequestWithProfile, res: Response) => {
  try {
    let user = req.profile; // get the user from the request object
    const { body } = req; // get the body from the request object

    // update the user with the new values
    extend(user, body); // extend the user with the new values, if a value in body already exists, it will be overwritten in the user object
    // console.log(req.body);
    // user = Object.assign(user, body); // assign the new values to the user object
    // console.log(user);

    if (!user) return res.status(400).json({ error: "User not found" });
    const { name, email, password } = body;
    const [encryptedPassword, salt] = await encryptPassword(password);
    const updated = new Date().toISOString();
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2, hashed_password = $3, salt = $4, updated = $5 WHERE _id = $6 RETURNING *",
      [name, email, encryptedPassword, salt, updated, user._id]
    );
    const updatedUser = rows[0];
    updatedUser.hashed_password = undefined;
    // console.log(updatedUser);
    updatedUser.salt = undefined;
    return res.json({ message: "User updated successfully", updatedUser });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
// const remove = async (req: RequestWithProfile, res: Response) => {
//   try {
//     let user = req.profile;
//     if (!user) return res.status(400).json({ error: "User not found" });
//     let deletedUser = await user.remove();
//     deletedUser.hashed_password = undefined;
//     deletedUser.salt = undefined;
//     return res.json({ message: "User deleted successfully", deletedUser });
//   } catch (error) {
//     return res.status(400).json({
//       error: dbErrorHandler.getErrorMessage(error),
//     });
//   }
// };
const remove = async (req: RequestWithProfile, res: Response) => {
  try {
    let user = req.profile;
    if (!user) return res.status(400).json({ error: "User not found xxx" });
    let { rows } = await pool.query(
      "DELETE FROM users WHERE _id = $1 RETURNING *",
      [user._id]
    );
    const deletedUser = rows[0];
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    if (!deletedUser.updated) delete deletedUser.updated;
    return res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};
export { create, list, userById, read, remove, update }; // the order of exporting is not important
