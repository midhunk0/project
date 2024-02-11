import mongoose from "mongoose";

const jafSchema = new mongoose.Schema({
    companyName: {
        value: {
            type: String,
            default: "",
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },

    natureOfBusiness: {
        value: {
            type: String,
            default: "",
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    homePage: String,
    contactPerson: {
        value: {
            type: String,
            default: "",
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    designation: {
        value: {
            type: String,
            default: "",
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    fax: String,
    telephoneNo: {
        value: {
            type: String,
            default: "",
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    email: {
        value: {
            type: String,
            default: "",

        },
        check: {
            type: Boolean,
            default: false
        }
    },
    jobDescription: {
        value: {
            type: String,
            default: "",

        },
        check: {
            type: Boolean,
            default: false
        }
    },
    address: {
        value: {
            type: String,
            default: "",
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    eligibilityCriteria: {
        tenthGradeCutoff: {
            value: {
                type: Number,

            },
            check: {
                type: Boolean,
                default: false
            }
        },
        twelfthGradeCutoff: {
            value: {
                type: Number

            },
            check: {
                type: Boolean,
                default: false
            }
        },
        btechCutoff: {
            value: {
                type: Number,

            },
            check: {
                type: Boolean,
                default: false
            }
        },
        maxClearedBacklogs: {
            value: {
                type: Number,

            },
            check: {
                type: Boolean,
                default: false
            }
        },
        maxNonClearedBacklogs: {
            value: {
                type: Number

            },
            check: {
                type: Boolean,
                default: false
            }
        },
    },
    branchesEligible: {
        values: {
            type: [String]
        },
        check: {
            type: Boolean,
            default: false
        },
    },
    payPackage: {
        grossSalary: {
            value: {
                type: Number,
            
            },
            check: {
                type: Boolean,
                default: false
            }
        },
        bond: {
            value: {
                type: String,
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum:["Yes","No"]
        },
        bondYears: {
            value:{
                type:Number,
            },
            check:{
                type:Boolean,
                default:false
            }
        },
    },
    recruitmentSchedule: {
        recruitmentTechnique: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
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
                default: false
            }
        },
    },
    selectionProcedure: {
        onlineExam: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        aptitudeTest: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        technicalTest: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        groupDiscussion: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        technicalInterview: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        personalInterview: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        branchOrientedInterview: {
            value: {
                type: String,
                default: "",
            
            },
            check: {
                type: Boolean,
                default: false
            },
            enum: ["Yes", "No"],
        },
        totalRounds: {
            value: {
                type: Number,
            
            },
            check: {
                type: Boolean,
                default: false
            }
        },
    },
    recruiter_id: {
        type: String,
        required: true,
    },
});

export default mongoose.model("jaf", jafSchema);
