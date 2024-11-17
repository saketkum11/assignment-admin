import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const server = process.env.PORT | 5000;
app.use(cors({ origin: process.env.CROSS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// app router
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

// listen to port
app.listen(server);

export { app };
