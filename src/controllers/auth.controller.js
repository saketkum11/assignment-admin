import z from "zod";
import { User } from "../models/user.model.js";
import { Assignment } from "../models/assigment.model.js";
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
    console.log("from register controller");

    const { email, name, password, role } = req.body;
    const validate = validateRegister.safeParse(req.body);

    console.log("from register controller5");
    // validate is true
    if (!validate.success) {
      return res.status(409).json({ message: validate.error });
    }
    console.log("from register controller27");
    // check user is already in database
    const alreadyUser = await User.findOne({
      $or: [{ email }],
    });
    console.log("from register controller32", alreadyUser);
    if (alreadyUser) {
      return res.status(409).json({ message: "user is already register " });
    }
    console.log(
      "from register controller36",
      email,
      name,
      password,
      role,
      req.body
    );
    // new user create

    const user = await User.create(req.body);
    return res.status(200).json({ message: "User Have registerd succefully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// login the user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // inputs are invalid
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Invalid email or password input" });
    }
    // validate req.body
    const validate = validateLogin.safeParse(req.body);
    if (!validate.success) {
      return res.status(500).json({ message: validate.error });
    }
    // if true ==> find user present in the data base
    const user = await User.findOne({
      $or: [{ email }],
    });
    // compare the password
    const passwordCompared = await user.isPassword(password);
    const alreadLogin = req.cookies.accessToken;
    if (!user) {
      return res.status(404).json({
        message: "User does not exits with this email id",
        status: 404,
      });
    }
    // check the password is true
    if (!passwordCompared)
      return res.status(403).json({ message: "Invalid password" });
    // generate the token
    const token = await user.generateAccessToken();
    if (!token) {
      return res.status(403).json({ message: "token not generated" });
    }
    const option = { httpOnly: true, secure: true };
    // then set cookies
    return res
      .status(200)
      .cookie("accessToken", token, option)
      .json({ message: "Successfully Logged IN" });
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
      .json({ message: "SuccessFully Logged out" });
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
    if (!adminId) return res.status(406).json({ message: "invalid adminID" });

    console.log("from line 134", adminId);
    // get user id from the request

    // create Assignment
    const creatAssignment = await Assignment.create({
      userId: user,
      task: task,
      admin: adminId,
    });
    return res.status(200).json({
      data: creatAssignment,
      statusCode: 200,
      message: "Successfully Created assignment",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// get all the admin list
const getAdmin = async (req, res) => {
  try {
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
      .json({ data: admin, message: "Admin data fetch successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
export { register, login, logout, uploadAssignment, getAdmin };
