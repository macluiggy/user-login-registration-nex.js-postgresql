import {
  requireSignin,
  hasAuthorization,
} from "../controllers/auth.controller";
import { Router } from "express";
import {
  create,
  list,
  read,
  remove,
  update,
  userById,
} from "../controllers/user.controller";
import validinfo from "../middleware/validinfo";

const router = Router();

router.route("/users").get(list).post(validinfo, create);

router
  .route("/users/:userId")
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);

router.route("/").put((req, res) => {
  console.log(req.body);

  res.json(req.body);
});
router.param("userId", userById);

export default router;
