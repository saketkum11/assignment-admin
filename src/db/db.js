import mongoose from "mongoose";
import { DATA } from "../utils/constant.js";

const connectToMongoos = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}/${DATA}`);
  } catch (error) {
    console.error(error.message);
  }
};
export { connectToMongoos };
