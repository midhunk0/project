import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: true,
            default:""
        },
        email: {
            type: String,
            // required: true,
            // unique: true,
            default:""

        },
        password:{
            type:String,
            default:""
        },
        studentCollegeID: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            // required: true,
            default:""

        },
        address: {
            type: String,
            // required: true,
            default:""

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
            // required: true,
            default:""

        },
        backlogs: {
            type: Number,
            default: 0,
        },
        profilePicture: {
            type: String,
            default:""

        },
        cv: {
            type: String,
            default:""

        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
);

export default mongoose.model("students", studentSchema);
