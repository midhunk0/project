import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Rejected", "Offered"],
    default: "Pending",
  },
  currentStage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalStages: {
    type: Number,
    required: true,
  },
  stages: [
    {
      stageNumber: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed", "Failed"],
        default: "Not Started",
      },
      feedback: {
        type: String,
        default: "",
      },
    },
  ],
});

export default mongoose.model("Application", applicationSchema);
