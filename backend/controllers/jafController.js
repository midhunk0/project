import jaf from "../models/jaf.js";
import Recruiter from "../models/recruiterModel.js";

export const postJafController = async (req, res, next) => {
    try {
        const formData = req.body;

        const {
            companyName,
            natureOfBusiness,
            homePage,
            contactPerson,
            designation,
            fax,
            telephoneNo,
            email,
            jobDescription,
            address,
            eligibilityCriteria,
            branchesEligible,
            payPackage,
            recruitmentSchedule,
            selectionProcedure,
            recruiter_id,
        } = formData;

        const newJaf = new jaf({
            companyName,
            natureOfBusiness,
            homePage,
            designation,
            fax,
            telephoneNo,
            email,
            jobDescription,
            address,
            branchesEligible: formData.tableData.map((row) => row.label),
            eligibilityCriteria: {
                tenthGradeCutoff: eligibilityCriteria?.tenthGradeCutoff || null,
                twelfthGradeCutoff:
                    eligibilityCriteria?.twelfthGradeCutoff || null,
                btechCutoff: eligibilityCriteria?.btechCutoff || null,
                maxClearedBacklogs:
                    eligibilityCriteria?.maxClearedBacklogs || null,
                maxNonClearedBacklogs:
                    eligibilityCriteria?.maxNonClearedBacklogs || null,
                // Map other fields similarly
            },
            payPackage: {
                grossSalary: payPackage?.grossSalary || null,
                bond: payPackage?.bond || "No",
                bondYears: payPackage?.bondYears || null,
                // Map other fields similarly
            },
            recruitmentSchedule: {
                recruitmentTechnique:
                    recruitmentSchedule?.recruitmentTechnique || "On Campus",
                preferredDates: recruitmentSchedule?.preferredDates || null,
            },
            selectionProcedure: {
                onlineExam: selectionProcedure?.onlineExam || "Yes",
                aptitudeTest: selectionProcedure?.aptitudeTest || "No",
                technicalTest: selectionProcedure?.technicalTest || "No",
                groupDiscussion: selectionProcedure?.groupDiscussion || "No",
                technicalInterview:
                    selectionProcedure?.technicalInterview || "Yes",
                personalInterview:
                    selectionProcedure?.personalInterview || "Yes",
                branchOrientedInterview:
                    selectionProcedure?.branchOrientedInterview || "No",
                totalRounds: selectionProcedure?.totalRounds || null,
                // Map other fields similarly
            },

            recruiter_id: formData.recruiter_id,
        });

        const savedJAF = await newJaf.save();
        await Recruiter.findByIdAndUpdate(formData.recruiter_id, {
            isJafSent: true,
        });

        res.status(201).json({ message: "JAF posted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getJafController = async (req, res, next) => {
    try {
        const jafID = req.params.id;

        const Jaf = await jaf.findById(jafID);
        if (!Jaf) {
            return res.status(404).json({ error: "jaf not found" });
        }

        res.status(200).json(Jaf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};
