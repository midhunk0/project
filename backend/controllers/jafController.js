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
        } = formData;

        const newJaf = new jaf({
            companyName: formData.companyName,
            natureOfBusiness: formData.natureOfBusiness,
            homePage: formData.homePage,
            designation: formData.designation,
            fax: formData.fax,
            telephoneNo: formData.telephoneNo,
            email: formData.email,
            jobDescription: formData.jobDescription,
            address: formData.address,
            branchesEligible: formData.tableData.map((row) => row.label),
            eligibilityCriteria: {
                tenthGradeCutoff: eligibilityCriteria.tenthGradeCutoff,
                twelfthGradeCutoff: eligibilityCriteria.twelfthGradeCutoff,
                btechCutoff: eligibilityCriteria.btechCutoff,
                maxClearedBacklogs: eligibilityCriteria.maxClearedBacklogs,
                maxNonClearedBacklogs:
                    eligibilityCriteria.maxNonClearedBacklogs,

                // Map other fields similarly
            },
            payPackage: {
                grossSalary: payPackage.grossSalary,
                bond: payPackage.bond,
                bondYears: payPackage.bondYears,
                // Map other fields similarly
            },
            recruitmentSchedule: {
                recruitmentTechnique: recruitmentSchedule.recruitmentTechnique,
                preferredDates: recruitmentSchedule.preferredDates,
            },
            selectionProcedure: {
                onlineExam: selectionProcedure.onlineExam,
                aptitudeTest: selectionProcedure.aptitudeTest,
                technicalTest: selectionProcedure.technicalTest,
                groupDiscussion: selectionProcedure.groupDiscussion,
                technicalInterview: selectionProcedure.technicalInterview,
                personalInterview: selectionProcedure.personalInterview,
                branchOrientedInterview:
                    selectionProcedure.branchOrientedInterview,
                totalRounds: selectionProcedure.totalRounds,
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
