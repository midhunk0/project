import mongoose from "mongoose";

const studentRepSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    repCollegeId :{
        type: String,
        required: true,
        unique: true,
    },
    stream: {
        type: String,
        default: ""
    },
    department: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("StudentRep", studentRepSchema);