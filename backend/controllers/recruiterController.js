// @ts-nocheck
import Recruiter from "../models/recruiterModel.js";
// import MatchedStudents from "../models/matchedModel.js";
import students from "../models/studentModel.js";
import { createError } from "../utils/error.js";

export const registerRecruiterController = async (req, res, next) => {
  try {
    const { companyName, email } = req.body;

    // Create a new recruiter instance
    const recruiter = new Recruiter({
      companyName,
      email,
    });

    // Save the recruiter to the database
    await recruiter.save();

    res.status(201).json(recruiter);
  } catch (error) {
    next(error);
  }
};

export const loginRecruiterController = async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({ email: req.body.email });
    if (!recruiter) {
      return next(createError(404, "no recruiter with this email"));
    }
    if (req.body.password !== recruiter.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", recruiter });
  } catch (error) {}
};

export const changePasswordRecruiterController = async (req, res, next) => {
  try {
    const recruiterID = req.params.id;
    const { newPassword } = req.body;

    await Recruiter.findByIdAndUpdate(recruiterID, {
      password: newPassword,
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    next(err);
    // res.status(500).json({ error: "An error occurred" });
  }
};

export const getProfileRecruiterController = async (req, res) => {
  try {
    const recruiterID = req.params.id;

    // Find the student with the provided student ID
    const recruiter = await Recruiter.findById(recruiterID);
    if (!recruiter) {
      return res.status(404).json({ error: "recruiter not found" });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateProfileRecruiterController = async (req, res) => {
  try {
    const recruiterID = req.params.id;
    const { companyName, email } = req.body;
    console.log(recruiterID, req.body);

    // Find the student with the provided student ID
    await Recruiter.findByIdAndUpdate(recruiterID, {
      companyName: companyName,
      email: email,
    });

    // Update the student profile

    // Save the updated student profile

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json(recruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get recruiter by ID
export const getRecruiterById = async (req, res) => {
  const recruiterId = req.params.recruiterId;

  try {
    // Find the recruiter by ID in the database
    const recruiter = await Recruiter.findById(recruiterId);

    // Check if the recruiter with the specified ID exists
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // Return the recruiter data
    res.status(200).json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const updateRecruitRequest = async (req, res) => {
//     const recruiterID = req.params.id;
//     const { action } = req.body;
//     console.log(recruiterID);

//     try {
//         // Find the recruiter by ID
//         const recruiter = await Recruiter.findById(recruiterID);

//         if (!recruiter) {
//             return res.status(404).json({ error: "Recruiter not found" });
//         }

//         // Update the recruitRequest field based on the action
//         recruiter.recruitRequest = action;

//         // Save the updated recruiter
//         await recruiter.save();

//         res.json({ message: "Recruit request updated successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// export const getAllRecruiters = async (req, res) => {
//     try {
//         const recruiters = await Recruiter.find({ recruitRequest: true });
//         res.json(recruiters);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// export const matchRequirements = async (req, res) => {
//     try {
//         // Fetch all recruiters
//         const recruiterID = req.params.id;
//         const recruiter = await Recruiter.findById(recruiterID);

//         // Iterate over each recruiter

//         const matchedStudents = [];

//         // Fetch all students
//         const studentdata = await students.find();

//         // Iterate over each student
//         for (const student of studentdata) {
//             // Check if the student matches the recruiter's requirements
//             if (student.cgpa >= recruiter.eligibilityCriteria.btechCutoff) {
//                 matchedStudents.push(student._id);
//             }
//         }
//         console.log(matchedStudents, recruiterID);

//         // Create/update the matched schema for the current recruiter
//         await MatchedStudents.create({
//             recruiterId: recruiterID,
//             studentIds: matchedStudents.map((studentId) => ({ studentId })),
//         });

//         console.log("Matching completed successfully!");
//     } catch (error) {
//         console.error("Matching failed:", error);
//     }
// };
// // Get a specific student by ID
// export const getStudentById = async (req, res) => {
//     const studentId = req.params.id;
//     try {
//         const student = await students.findById(studentId);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         res.json(student);
//     } catch (error) {
//         console.error(`Failed to fetch student with ID ${studentId}:`, error);
//         res.status(500).json({ message: "Failed to fetch student" });
//     }
// };

// // Get all companies with matched students
// export const getCompaniesWithMatchedStudents = async (req, res) => {
//     try {
//         const companies = await Recruiter.find(
//             {},
//             "companyName natureOfBusiness payPackage.grossSalary"
//         );
//         res.json(companies);
//     } catch (error) {
//         console.error("Failed to fetch companies:", error);
//         res.status(500).json({ message: "Failed to fetch companies" });
//     }
// }; // Get a specific company and its matched students
// export const getCompanyWithMatchedStudents = async (req, res) => {
//     const companyId = req.params.id;
//     try {
//         const company = await Recruiter.findById(
//             companyId,
//             "companyName natureOfBusiness payPackage.grossSalary"
//         );
//         if (!company) {
//             return res.status(404).json({ message: "Company not found" });
//         }

//         const matchedStudents = await MatchedStudents.find(
//             { recruiterId: companyId },
//             "studentIds"
//         ).populate({
//             path: "studentIds.studentId",
//             select: "studentCollegeID username email cgpa skills department",
//         });

//         res.json({ company, matchedStudents });
//     } catch (error) {
//         console.error(
//             `Failed to fetch company with ID ${companyId} and matched students:`,
//             error
//         );
//         res.status(500).json({
//             message: "Failed to fetch company and matched students",
//         });
//     }
// };

// export const postNotificationController = async (req, res) => {
//     try {
//         const { recruiterId, isNotification, studentIds } = req.body;

//         // Update the existing notification document
//         const notification = await MatchedStudents.findOneAndUpdate(
//             { recruiterId }, // Find the document based on the recruiterId
//             { isNotification, studentIds }, // Update the isNotification and studentIds fields
//             { new: true, upsert: true } // Set 'new' to true to return the updated document and 'upsert' to true to create a new document if it doesn't exist
//         );

//         // You can perform additional actions here, such as sending notifications to students

//         res.status(200).json(notification);
//     } catch (error) {
//         console.error("Failed to update notification:", error);
//         res.status(500).json({ message: "Failed to update notification" });
//     }
// };

// export const getNotificationController = async (req, res) => {
//     try {
//         const notifications = await MatchedStudents.find();
//         res.status(200).json(notifications);
//     } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//         res.status(500).json({ message: "Failed to fetch notifications" });
//     }
// };

// // Dummy function to simulate sending a notification
