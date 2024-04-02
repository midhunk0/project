import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: "",
        required: true,
        unique: true,
    },
    email: {
        type: String,
        default: "",
        required: true,
        unique: true,
    },
    natureOfBuisiness: {
        type: String,
        default: "",
    },
    contactPerson: {
        type: String,
        default: "",
    },
    designation: {
        type: String,
        default: "",
    },
    phoneNo: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    isJafSent: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Recruiter", recruiterSchema);
