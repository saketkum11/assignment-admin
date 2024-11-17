import mongoose from "mongoose";
import { Assignment } from "../models/assigment.model.js";
import z from "zod";
const validateInputString = z.string();
// get assignment
const getAssigment = async (req, res) => {
  try {
    const assignment = await Assignment.find();
    return res.status(200).json({
      data: assignment,
      message: "Assignment data fetch successfully",
    });
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
      return res.status(500).json({ message: validateId.error });
    }
    // find assignment
    const findAssignment = await Assignment.findById(id);
    if (findAssignment.status === "accept") {
      return res
        .status(406)
        .json({ message: "assignment  is already accepted by admin" });
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

    return res.status(200).json({
      message: "Assignment  is accepted by Admin ",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// reject the assignment

const rejectAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json("invalid ID");
    }
    const validateId = validateInputString.safeParse(id);
    if (!validateId.success) {
      return res.status(500).json({ message: validateId.error });
    }
    // find assignment
    const findAssignment = await Assignment.findById(id);
    if (findAssignment.status === "reject") {
      return res
        .status(406)
        .json({ message: "assignment  is already rejected by admin" });
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
    return res.status(200).json({
      data: assignment,
      message: "Assignment data fetch successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

export { getAssigment, acceptAssignment, rejectAssignment };
