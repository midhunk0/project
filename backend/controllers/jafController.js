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

    let branchesEligibleData = [];
    if (formData.tableData) {
      branchesEligibleData = formData.tableData.map((row) => row.label);
    }

    const newJaf = new jaf({
      companyName,
      natureOfBusiness,
      homePage,
      designation,
      fax,
      telephoneNo,
      contactPerson,
      email,
      jobDescription,
      address,
      branchesEligible: branchesEligibleData,
      eligibilityCriteria: {
        tenthGradeCutoff: formData?.tenthGradeCutoff || null,
        twelfthGradeCutoff: formData?.twelfthGradeCutoff || null,
        btechCutoff: formData?.btechCutoff || null,
        maxClearedBacklogs: formData?.maxClearedBacklogs || null,
        maxNonClearedBacklogs:
        formData?.maxNonClearedBacklogs || null,
        // Map other fields similarly
      },
      payPackage: {
        grossSalary: formData?.grossSalary || null,
        bond: formData?.bond || "No",
        bondYears: formData?.bondYears || null,
        // Map other fields similarly
      },
      recruitmentSchedule: {
        recruitmentTechnique:
        formData?.recruitmentTechnique || "On Campus",
        preferredDates: formData?.preferredDates || null,
      },
      selectionProcedure: {
        onlineExam: formData?.onlineExam || "Yes",
        aptitudeTest: formData?.aptitudeTest || "No",
        technicalTest: formData?.technicalTest || "No",
        groupDiscussion: formData?.groupDiscussion || "No",
        technicalInterview: formData?.technicalInterview || "Yes",
        personalInterview: formData?.personalInterview || "Yes",
        branchOrientedInterview:
        formData?.branchOrientedInterview || "No",
        totalRounds: formData?.totalRounds || null,
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
    const recruiterID = req.params.id;

    const Jaf = await jaf.findOne({ recruiter_id: recruiterID });
    if (!Jaf) {
      return res.status(404).json({ error: "jaf not found" });
    }

    res.status(200).json(Jaf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
