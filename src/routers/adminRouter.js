import express, { Router } from "express";
import {
  acceptAssignment,
  getAssigment,
  rejectAssignment,
} from "../controllers/admin.controller.js";
import { adminMiddleWare } from "../middleware/admin.middleware.js";

const router = Router();
const app = express();

// middlerware  used to give the access of other routes

router.route("/assignments").get(adminMiddleWare, getAssigment);
router.route("/assignments/:id/accept").post(adminMiddleWare, acceptAssignment);
router.route("/assignments/:id/reject").post(adminMiddleWare, rejectAssignment);
export default router;
