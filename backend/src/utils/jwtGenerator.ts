import jwt, { Secret } from "jsonwebtoken";
// require("dotenv").config();
import { config } from "dotenv";
config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: "1hr",
  }); // jsw sign is a method of jwt that takes payload and secret and returns a token
}

export default jwtGenerator;
