import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  isJafSent: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Recruiter", recruiterSchema);
