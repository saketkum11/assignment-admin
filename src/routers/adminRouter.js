import express, { Router } from "express";
import {
  acceptAssignment,
  getAssigment,
  rejectAssignment,
} from "../controllers/admin.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = Router();
const app = express();

// middlerware  used to give the access of other routes 

app.use(verifyAuth);
router.route("/assignments").get(getAssigment);
router.route("/assignments/:id/accept").post(acceptAssignment);
router.route("/assignments/:id/reject").post(rejectAssignment);
export default router;
