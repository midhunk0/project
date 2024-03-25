import Application from "../models/applicationModel.js";

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

    // Create a new application instance
    const newApplication = new Application({
      studentId,
      companyId,
      totalStages,
      currentStage: 0, // Assuming the current stage starts at 1
      stages: Array.from({ length: totalStages + 1 }, (_, index) => ({
        stageNumber: index + 1,
        status: "Not Started",
        feedback: "",
      })),
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
