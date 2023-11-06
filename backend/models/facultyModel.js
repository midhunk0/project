import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    username: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    password:{
        type:String,
        default:""
    },
    facultyID: {
        type: String,
        required: true,
        unique: true,
    },
    
},{ timestamps: true });

export default mongoose.model("Faculty", facultySchema);
