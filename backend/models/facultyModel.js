import mongoose, { Schema } from "mongoose";
import students from "./studentModel.js";

const facultySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
