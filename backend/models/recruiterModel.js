import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        default:""
    },
    natureOfBusiness: {
        type: String,
        required: true,
    },
    homePage: String,
    contactPerson: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    fax: String,
    telephoneNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    eligibilityCriteria: {
        tenthGradeCutoff: {
            type: Number,
            required: true,
        },
        twelfthGradeCutoff: {
            type: Number,
            required: true,
        },
        btechCutoff: {
            type: Number,
            required: true,
        },
        maxClearedBacklogs: {
            type: Number,
            required: true,
        },
        maxNonClearedBacklogs: {
            type: Number,
            required: true,
        },
    },
    branchesEligible: {
        type: [String],
        required: true,
    },
    payPackage: {
        grossSalary: {
            type: Number,
            required: true,
        },
        bond: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        bondYears: Number,
    },
    recruitmentSchedule: {
        recruitmentTechnique: {
            type: String,
            required: true,
            enum: ["On Campus", "Off Campus"],
        },
        preferredDates: {
            type: String,
            required: true,
        },
    },
    selectionProcedure: {
        onlineExam: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        aptitudeTest: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        technicalTest: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        groupDiscussion: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        technicalInterview: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        personalInterview: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        branchOrientedInterview: {
            type: String,
            required: true,
            enum: ["Yes", "No"],
        },
        totalRounds: {
            type: Number,
            required: true,
        },
    },
});

export default mongoose.model("Recruiter", recruiterSchema);
