import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const adminMiddleWare = async (req, res, next) => {
  try {
    // access token from cookies
    const accessToken =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // check token false
    if (!accessToken) {
      return res.status(409).json(ApiErrorHandler("Please login first", 409));
    }
    // if token true decode the token
    const decodeToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    // get user detail here
    const user = await User.findById(decodeToken._id).select("-password");
    // store the user id in to the request
    if (!user) {
      return res.status(409).json(ApiErrorHandler("token is wrong", 409));
    }
    if (user.role === "user") {
      return res
        .status(406)
        .json(ApiErrorHandler("Only Admin allowed to access modified", 406));
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
export { adminMiddleWare };
