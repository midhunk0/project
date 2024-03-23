import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      default: "",
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    studentCollegeID: {
      type: String,
      required: true,
      unique: true,
    },
    semester: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    facultyEmail: {
      type: String,
      default: "",
    },
    bloodGroup: {
      type: String,
    },
    aadhaar: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    domicileState: {
      type: String,
    },
    religion: {
      type: String,
    },
    category: {
      type: String,
    },
    motherTongue: {
      type: String,
    },
    plustwograde: {
      type: Number,
    },
    tenthgrade: {
      type: Number,
    },
    clearedBacklogs: {
      type: Number,
    },
    nonclearedBacklogs: {
      type: Number,
    },
    rank: {
      type: Number,
    },
    admissionQouta: {
      type: String,
    },
    admissionNumber: {
      type: String,
    },
    admittedScheme: {
      type: String,
    },
    admittedProgram: {
      type: String,
    },

    department: {
      type: String,
      required: true,
    },
    admittedType: {
      type: String,
    },
    cgpa: {
      type: Number,
    },
    skills: {
      type: [String],
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    cv: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("students", studentSchema);
