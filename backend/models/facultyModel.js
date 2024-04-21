import mongoose from "mongoose";

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
