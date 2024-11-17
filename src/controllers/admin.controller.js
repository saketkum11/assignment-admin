import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utils/ApiResponseHandler.js";
import { Assignment } from "../models/assigment.model.js";
import z from "zod";
import mongoose from "mongoose";
const validateInputString = z.string();
// get assignment
const getAssigment = async (req, res) => {
  try {
    const assignment = await Assignment.aggregate([
      {
        $match: {
          admin: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          localField: "userId",
          foreignField: "_id",
          from: "users",
          as: "userId",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          localField: "admin",
          foreignField: "_id",
          from: "users",
          as: "admin",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
        },
      },
      { $unwind: "$userId" },
      { $unwind: "$admin" },
    ]);
    return res
      .status(200)
      .json(
        ApiResponseHandler(
          assignment,
          "Assignment data fetch successfully",
          200
        )
      );
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// accept the assignment
const acceptAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json("invalid ID");
    }
    const validateId = validateInputString.safeParse(id);
    if (!validateId.success) {
      return res.status(409).json(ApiErrorHandler(validateId.error, 409));
    }
    // find assignment
    const findAssignment = await Assignment.findById(id);
    if (findAssignment.status === "accept") {
      return res
        .status(406)
        .json(ApiErrorHandler("assignment  is already accepted by admin", 406));
    }

    const assignment = await Assignment.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "accept",
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json(
        ApiResponseHandler(assignment, "Assignment  is accepted by Admin ", 200)
      );
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// reject the assignment

const rejectAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(409).json(ApiErrorHandler("invalid ID", 409));
    }
    const validateId = validateInputString.safeParse(id);
    if (!validateId.success) {
      return res.status(409).json(ApiErrorHandler(validateId.error, 409));
    }
    // find assignment
    const findAssignment = await Assignment.findById(id);
    if (findAssignment.status === "reject") {
      return res
        .status(406)
        .json(ApiErrorHandler("assignment  is already  rejected by admin", 406));
    }
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "reject",
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json(
        ApiResponseHandler(assignment, "Assignment is rejected by Admin ", 200)
      );
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export { getAssigment, acceptAssignment, rejectAssignment };
