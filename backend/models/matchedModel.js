import mongoose from "mongoose";

const matchedSchema = new mongoose.Schema({
    recruiterId: {
        type: String,
        required: true,
    },
    studentIds: [
        {
            studentId: {
                type: String,
                required: true,
            },
            accepted: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
    ],
});

export default mongoose.model("MatchedStudents", matchedSchema);
