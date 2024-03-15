import jaf from "../models/jaf.js";
import Recruiter from "../models/recruiterModel.js";

export const postJafController = async (req, res, next) => {
  try {
    const formData = req.body;

    const {
      companyName,
      natureOfBusiness,
      category,
      homePage,
      contactPerson,
      designation,
      fax,
      telephoneNo,
      email,
      jobDescription,
      address,
      branchesEligible,
      tenthGradeCutoff,
      twelfthGradeCutoff,
      btechCutoff,
      maxClearedBacklogs,
      maxNonClearedBacklogs,
      grossSalary,
      bond,
      bondYears,
      recruitmentTechnique,
      preferredDates,
      onlineExam,
      aptitudeTest,
      technicalTest,
      groupDiscussion,
      technicalInterview,
      personalInterview,
      branchOrientedInterview,
      totalRounds,

      recruiter_id,
    } = formData;

    let branchesEligibleDataValues = [];
    if (formData.tableData) {
      branchesEligibleDataValues = formData.tableData.map((row) => row.label);
    }
    const newJaf = new jaf({
      companyName: {
        value: formData.companyName || "",
      },
      natureOfBusiness: {
        value: formData.natureOfBusiness || "",
      },
      category: {
        value: formData.category || "",
      },
      homePage: {
        value: formData.homePage || "",
      },
      contactPerson: {
        value: formData.contactPerson || "",
      },
      designation: {
        value: formData.designation || "",
      },
      fax: {
        value: formData.fax || "",
      },
      telephoneNo: {
        value: formData.telephoneNo || "",
      },
      email: {
        value: formData.email || "",
      },
      jobDescription: {
        value: formData.jobDescription || "",
      },
      address: {
        value: formData.address || "",
      },
      branchesEligible: {
        values: branchesEligibleDataValues,
      },

      tenthGradeCutoff: {
        value: formData?.tenthGradeCutoff || null,
      },

      twelfthGradeCutoff: {
        value: formData?.twelfthGradeCutoff || null,
      },
      btechCutoff: {
        value: formData?.btechCutoff || null,
      },
      maxClearedBacklogs: {
        value: formData?.maxClearedBacklogs || null,
      },
      maxNonClearedBacklogs: {
        value: formData?.maxNonClearedBacklogs || null,
      },
      // Map other fields similarly

      grossSalary: {
        value: formData?.grossSalary || null,
      },
      bond: {
        value: formData?.bond || "No",
      },
      bondYears: {
        value: formData?.bondYears || null,
      },
      // Map other fields similarly

      recruitmentTechnique: {
        value: formData?.recruitmentTechnique || "On Campus",
      },
      preferredDates: {
        value: formData?.preferredDates || null,
      },

      onlineExam: {
        value: formData?.onlineExam || "Yes",
      },
      aptitudeTest: {
        value: formData?.aptitudeTest || "No",
      },

      technicalTest: {
        value: formData?.technicalTest || "No",
      },
      groupDiscussion: {
        value: formData?.groupDiscussion || "No",
      },
      technicalInterview: {
        value: formData?.technicalInterview || "Yes",
      },
      personalInterview: {
        value: formData?.personalInterview || "Yes",
      },
      branchOrientedInterview: {
        value: formData?.branchOrientedInterview || "No",
      },

      totalRounds: {
        value: formData?.totalRounds || null,
      },
      // Map other fields similarly

      recruiter_id: formData.recruiter_id,
    });
    console.log(newJaf);

    const savedJAF = await newJaf.save();
    res.status(201).json({ message: "JAF posted successfully" });
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

export const updateJafController = async (req, res, next) => {
  try {
    const jafid = req.params.id;
    const { name, checked } = req.body;
    console.log(name, checked);
    const updatedJAF = await jaf.findByIdAndUpdate(
      jafid,
      { [`${name}.check`]: checked },
      { new: true } // Return the updated document
    );

    if (!updatedJAF) {
      return res.status(404).json({ message: "JAF not found" });
    }

    return res
      .status(200)
      .json({ message: `Check field of ${name} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const isAdminJafSent = async (req, res) => {
  try {
    const jafId = req.params.id;
    const adminjaf = true;
    console.log(jafId, adminjaf);
    await jaf.findByIdAndUpdate(jafId, {
      isAdminJafSent: adminjaf,
    });

    res.status(200).json({ message: "adminjaf changed successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await jaf.find({ isAdminJafSent: true });
    res.json(notifications);
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
