import mongoose from "mongoose";

const jafSchema = new mongoose.Schema({
  isAdminJafSent: {
    type: Boolean,
    default: false,
  },
  isAdminRead: {
    type: Boolean,
    default: false,
  },
  isStudentRead: {
    type: Boolean,
    default: false,
  },
  isLive:{
    type: Boolean,
    default: true,
  },
  applicationDeadline: {
    value: {
      type: Date,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  companyName: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  natureOfBusiness: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  category: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  fax: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  contactPerson: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  designation: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  homePage: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  telephoneNo: {
    value: {
      type: String,
      default: "",
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  email: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  jobDescription: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  address: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  //eligibilityCriteria

  tenthGradeCutoff: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  twelfthGradeCutoff: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  btechCutoff: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  maxClearedBacklogs: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  maxNonClearedBacklogs: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  branchesEligible: {
    values: {
      type: [String],
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  recruitmentProcess: {
    values: {
      type: [String],
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  //payPackage
  grossSalary: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  bond: {
    value: {
      type: String,
    },
    check: {
      type: Boolean,
      default: false,
    },
    enum: ["Yes", "No"],
  },
  bondYears: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  //recruitmentSchedule:
  recruitmentTechnique: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
    enum: ["On Campus", "Off Campus"],
  },
  preferredDates: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  totalRounds: {
    value: {
      type: Number,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  nb: {
    value: {
      type: String,
      default: "",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  recruiter_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("jaf", jafSchema);
