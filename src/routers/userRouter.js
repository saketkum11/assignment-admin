import { Router } from "express";
import {
  getAdmin,
  login,
  logout,
  register,
  uploadAssignment,
} from "../controllers/auth.controller.js";
import { userMiddleWare } from "../middleware/user.middleware.js";

const router = Router();

// user routes login
// user router register
// user logout

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/upload").post(userMiddleWare,  uploadAssignment);
router.route("/admins").get(userMiddleWare,  getAdmin);

export default router;
