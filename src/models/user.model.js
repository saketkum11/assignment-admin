import mongoose, { Schema } from "mongoose";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      require: true,
    },
    assigment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcyrpt.hash(this.password, 10);
  next();
});
userSchema.methods.isPassword = async function (oldPassword) {
  const isEncrypt = await bcyrpt.compare(oldPassword, this.password);
  return isEncrypt;
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
const User = mongoose.model("User", userSchema);

export { User };
