import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        studentCollegeID: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        cgpa: {
            type: Number,
            required: true,
        },
        skills: {
            type: [String],
            default: [],
        },
        department: {
            type: String,
            required: true,
        },
        backlogs: {
            type: Number,
            default: 0,
        },
        profilePicture: {
            type: String,
        },
        cv: {
            type: String,
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);

export default mongoose.model("students", studentSchema);
