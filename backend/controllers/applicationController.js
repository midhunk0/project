import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import Recruiter from "../models/recruiterModel.js";

// Controller function for creating a new application
export const createApplication = async (req, res) => {
  try {
    const { studentId, companyId, totalStages } = req.body;

    // Check if required fields are provided
    if (!studentId || !companyId || !totalStages) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Create a new application instance with stage 0 status as "Passed"
    const newApplication = new Application({
      studentId,
      companyId,
      totalStages,
      currentStage: 0,
      stages: Array.from({ length: totalStages + 1 }, (_, index) => ({
        stageNumber: index,
        status: index === 0 ? "Completed" : "Not Started",
        feedback: "",
      })),
      isAdminVerified: false,
    });

    // Save the application to the database
    await newApplication.save();

    res.status(201).json({
      message: "Application created successfully.",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res
      .status(500)
      .json({ error: "Failed to create application. Please try again." });
  }
};

export const getApplicationsByRecruiterId = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch applications with the given companyId (assuming it's the recruiterId)
    const applications = await Application.find({ companyId: id });

    // Initialize an array to store student details
    const studentDetails = [];

    // Iterate through each application to get student details
    for (const application of applications) {
      // Fetch student details using the studentId from the application
      const student = await Student.findById(application.studentId);

      // Push required student details to the studentDetails array
      studentDetails.push({
        _id: student._id,
        name: student.username,
        phone: student.phone,
        email: student.email,
        tenthGrade: student.tenthgrade,
        twelfthGrade: student.plustwograde,
        cgpa: student.cgpa,
        collegeId: student.studentCollegeID,
      });
    }

    res.status(200).json({ applications, studentDetails });
  } catch (error) {
    console.error("Error fetching applications by companyId:", error);
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};

export const getApplicationsByStudentId = async (req, res) => {
  const { id } = req.params;

  try {
    const applications = await Application.find({ studentId: id });

    const recruiterDetails = [];

    // Iterate through each application to get student details
    for (const application of applications) {
      // Fetch student details using the studentId from the application
      const recruiter = await Recruiter.findById(application.companyId);

      // Push required student details to the studentDetails array
      recruiterDetails.push({
        _id: recruiter._id,
        name: recruiter.companyName,
        natureOfBuisiness: recruiter.natureOfBuisiness,
        email: recruiter.email,
      });
    }

    res.status(200).json({ applications ,recruiterDetails});
  } catch (error) {
    console.error("Error fetching applications by companyId:", error);
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};

export const updateApplication = async (req, res) => {
  const { id } = req.params; // Assuming the application ID is passed in the URL params
  const updatedApplicationData = req.body; // Assuming the updated application data is sent in the request body

  try {
    // Find the application by ID
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    // Update the application data
    application.currentStage = updatedApplicationData.currentStage;
    application.stages = updatedApplicationData.stages;
    application.status = updatedApplicationData.status;

    // Save the updated application to the database
    await application.save();

    res
      .status(200)
      .json({ message: "Application updated successfully.", application });
  } catch (error) {
    console.error("Error updating application:", error);
    res
      .status(500)
      .json({ error: "Failed to update application. Please try again." });
  }
};

export const updateIsAdminVerified = async (req, res) => {
  const { id } = req.params; // Assuming the application ID is passed in the URL params
  const updatedApplicationData = req.body;

  try {
    // Find the application by ID
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    // Update the isAdminVerified field
    application.isAdminVerified = updatedApplicationData.isAdminVerified;

    // Save the updated application to the database
    await application.save();
    console.log("Updated application:", application);

    res
      .status(200)
      .json({ message: "Application updated successfully.", application });
  } catch (error) {
    console.error("Error updating application:", error);
    res
      .status(500)
      .json({ error: "Failed to update application. Please try again." });
  }
};
