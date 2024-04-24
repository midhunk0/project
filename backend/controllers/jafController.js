import jaf from "../models/jaf.js";
import Recruiter from "../models/recruiterModel.js";
import students from "../models/studentModel.js";
import nodemailer from "nodemailer";

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
      totalRounds,
      recruitmentProcess,
      nb,
      recruiter_id,
    } = formData;

    let branchesEligibleDataValues = [];
    let recruitmentProcessDataValues = [];

    if (formData.tableData) {
      branchesEligibleDataValues = formData.tableData.map((row) => row.label);
    }
    if (formData.recruitmentProcess) {
      recruitmentProcessDataValues = formData.recruitmentProcess.map(
        (process) => process.label
      );
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
      recruitmentProcess: {
        values: recruitmentProcessDataValues,
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

      totalRounds: {
        value: formData?.totalRounds || null,
      },
      nb: {
        value: "",
      },
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

//to get the jaf of a particular recruiter
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

//to set the checked values
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

//to fetch all jaf which admin sent to students
export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await jaf.find({ isAdminJafSent: true });
    res.json(notifications);
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNbController = async (req, res) => {
  try {
    const jafid = req.params.id; // Assuming you have the JAF ID in the URL params
    const { nb, check } = req.body; // Get the new NB value and check value from the request body

    // Update the JAF document in the database with the new NB value and check value
    const updatedJAF = await jaf.findByIdAndUpdate(
      jafid,
      { nb, check }, // Update both the 'nb' and 'check' fields with the new values
      { new: true } // Return the updated document
    );

    if (!updatedJAF) {
      return res.status(404).json({ message: "JAF not found" });
    }

    // Return a success response with the updated JAF data
    res
      .status(200)
      .json({ message: "NB field updated successfully", jaf: updatedJAF });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const sentEmailToStudentsController = async (req, res, next) => {
  try {
    const fetchStudents = await students.find();
    const studentsEmails = fetchStudents.map((student) => student.email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "temp200659@cet.ac.in",
        pass: "rulj xmwv znic iksd",
      },
    });

    const mailOptions = {
      from: '"Placement Officer" <temp200659@cet.ac.in>',
      to: studentsEmails.join(", "),
      subject: "Message from STUDUP",
      text: `Dear Student,

We hope this message finds you well.
We would like to inform you about an important update on your STUDUP dashboard. "A new company has started their placement process!"

Please log in to your dashboard at your earliest convenience and apply for the opportunity.

Should you encounter any difficulties or have any questions, please do not hesitate to reach out to us. We are here to assist you throughout this process.

Best regards,

Placement Officer
College of Engineering Trivandrum`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        // Handle error response
        return res.status(500).send("Error sending email");
      }
      // Handle success response
      console.log("Email sent: " + info.response);
      return res.status(200).send("Email sent successfully");
    });
  } catch (error) {
    console.log(error);
    // Handle error response
    return res.status(500).send("Error sending email");
  }
};
