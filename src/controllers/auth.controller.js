import z from "zod";
import { User } from "../models/user.model.js";
import { Assignment } from "../models/assigment.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utils/ApiResponseHandler.js";
// register user
const validateRegister = z.object({
  email: z.string().email({ message: "Must be email" }),
  password: z.string().max(8).min(5),
  name: z.string(),
  role: z.string(),
});
const validateLogin = z.object({
  email: z.string().email({ message: "Must be email" }),
  password: z.string().max(8).min(5),
});
export const validateInputString = z.string();
const register = async (req, res) => {
  try {
    // validate the user with zod

    const { email, name, password, role } = req.body;

    // check the input field undefined
    if (
      [name, role, email, password].some(
        (field) => typeof field === "string" && field?.trim() === ""
      )
    ) {
      return res
        .status(409)
        .json(ApiErrorHandler("User must sent proper value", 409));
    }

    const validate = validateRegister.safeParse(req.body);

    // validate is false
    if (!validate.success) {
      return res.status(409).json(ApiErrorHandler(validate.error, 409));
    }
    // check user is already in database
    const alreadyUser = await User.findOne({
      $or: [{ email }],
    });
    if (alreadyUser) {
      return res
        .status(403)
        .json(ApiErrorHandler("User is already register", 403));
    }

    // new user create

    const user = await User.create(req.body);
    return res
      .status(200)
      .json(ApiResponseHandler(user, "User has been created succssfully", 200));
  } catch (error) {
    return res.status(500).json(error);
  }
};

// login the user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // inputs are invalid
    if (
      [email, password].some(
        (field) => typeof field === "string" && field?.trim() === ""
      )
    ) {
      return res
        .status(409)
        .json(ApiErrorHandler("User must sent proper value", 409));
    }
    // validate req.body
    const validate = validateLogin.safeParse(req.body);
    if (!validate.success) {
      return res.status(409).json(ApiErrorHandler(validate.error, 409));
    }
    // if true ==> find user present in the data base
    const user = await User.findOne({
      $or: [{ email }],
    });
    // compare the password
    const passwordCompared = await user.isPassword(password);
    if (!user) {
      return res
        .status(404)
        .json(ApiErrorHandler("User does not exits with this email id", 404));
    }
    // check the password is true
    if (!passwordCompared)
      return res.status(403).json(ApiErrorHandler("Invalid password", 409));
    // generate the token
    const token = await user.generateAccessToken();
    if (!token) {
      return res.status(409).json(ApiErrorHandler("token not generated", 409));
    }
    const option = { httpOnly: true, secure: true };
    // then set cookies
    return res
      .status(200)
      .cookie("accessToken", token, option)
      .json(ApiResponseHandler({}, "Successfully Logged IN", 200));
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const logout = async (req, res) => {
  try {
    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json(ApiResponseHandler(null, "SuccessFully Logged out", 200));
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
// upload your assignment
const uploadAssignment = async (req, res) => {
  try {
    // validate inputs
    const { adminId } = req.query;
    const { task } = req.body;
    const user = req.user;
    const validateAdmin = validateInputString.safeParse(adminId);
    const validateTask = validateInputString.safeParse(task);

    if (!validateAdmin.success || !validateTask.success) {
      return res.status(403).json({
        message: "either  adminId is worng or task",
        errorAdmin: validateAdmin.error,
        errorTask: validateTask.error,
      });
    }
  
    // check adminId is there or not
    if (!adminId)
      return res.status(409).json(ApiResponseHandler("invalid adminID", 409));

    // create Assignment
    const creatAssignment = await Assignment.create({
      userId: user._id,
      task: task,
      admin: adminId,
    });
    return res
      .status(200)
      .json(
        ApiResponseHandler(
          creatAssignment,
          "Successfully Created assignment",
          200
        )
      );
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// get all the admin list
const getAdmin = async (req, res) => {
  try {
    console.log("Cat");

    const admin = await User.aggregate([
      {
        $match: {
          role: "admin",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json(ApiResponseHandler(admin, "Admin data fetch successfully", 200));
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
export { register, login, logout, uploadAssignment, getAdmin };
