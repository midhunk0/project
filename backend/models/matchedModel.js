import mongoose from "mongoose";

const matchedSchema = new mongoose.Schema({
  recruiterId: {
    type: String,
    required: true,
  },
  studentIds: [{
    type: String,
    default:"",
    accepted: {
        type: Boolean,
        required:true,
        default: true,
      },
    // required: true,
  }],
});

export default mongoose.model("MatchedStudents", matchedSchema);
