import mongoose from "mongoose";

const matchedSchema = new mongoose.Schema({
    recruiterId: {
        type: String,
        required: true,
    },

    isNotification:{
        type:Boolean,
        default:false
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
                default: false,
            },
        },
    ],
});

export default mongoose.model("MatchedStudents", matchedSchema);
