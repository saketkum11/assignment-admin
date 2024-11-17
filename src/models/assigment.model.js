import mongoose, { Schema } from "mongoose";

const assigmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    task: {
      type: String,
      require: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      enum: ["pending", "accept", "reject"],
      default: "pending",
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assigmentSchema);
