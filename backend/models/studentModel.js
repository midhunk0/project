import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    faculty:{
        type:String,
        default:""
        
    },
    bloodGroup: {
        type: String
    },
    aadhar: {
        type: String
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
    nationality: {
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
    plus2: {
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
        // required: true,
        default:""
    },
    admittedType:{
        type: String,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    skills: {
        type: [String],
        default: [],
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
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{ timestamps: true });

export default mongoose.model("students", studentSchema);
