import mongoose from "mongoose";

const jafSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: "",
        required: true,
        check: false,
    },

    natureOfBusiness: {
        type: String,
        default: "",
        check: false,
    },
    homePage: String,
    contactPerson: {
        type: String,
        default: "",
        check: false,
    },
    designation: {
        type: String,
        default: "",
        check: false,
    },
    fax: String,
    telephoneNo: {
        type: String,
        check: false,
    },
    email: {
        type: String,

        check: false,
    },
    jobDescription: {
        type: String,
        default: "",
        check: false,
    },
    address: {
        type: String,
        default: "",
        check: false,
    },
    eligibilityCriteria: {
        tenthGradeCutoff: {
            type: Number,
            check: false,
        },
        twelfthGradeCutoff: {
            type: Number,
            check: false,
        },
        btechCutoff: {
            type: Number,
            check: false,
        },
        maxClearedBacklogs: {
            type: Number,
            check: false,
        },
        maxNonClearedBacklogs: {
            type: Number,
            check: false,
        },
    },
    branchesEligible: {
        type: [String],
        check: false,
    },
    payPackage: {
        grossSalary: {
            type: Number,
            check: false,
        },
        bond: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        bondYears: Number,
    },
    recruitmentSchedule: {
        recruitmentTechnique: {
            type: String,
            check: false,
            enum: ["On Campus", "Off Campus"],
        },
        preferredDates: {
            type: String,
            check: false,
        },
    },
    selectionProcedure: {
        onlineExam: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        aptitudeTest: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        technicalTest: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        groupDiscussion: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        technicalInterview: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        personalInterview: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        branchOrientedInterview: {
            type: String,
            check: false,
            enum: ["Yes", "No"],
        },
        totalRounds: {
            type: Number,
            check: false,
        },
    },
    recruiter_id: {
        type: String,
        required: true,
    },
});

export default mongoose.model("jaf", jafSchema);
