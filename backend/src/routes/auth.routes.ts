import { signin, signout } from "../controllers/auth.controller";
import { Router } from "express";
import validinfo from "../middleware/validinfo";

const router = Router();

router.route("/auth/signin").post(validinfo, signin); // request to authenticate the user with their email and password

router.route("/auth/signout").get(signout); // request to clear the cookie containing the JWT that was set on the response object after sign-in
export default router;
