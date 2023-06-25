import Recruiter from "../models/recruiterModel.js";

import MatchedStudents from "../models/matchedModel.js";
import students from "../models/studentModel.js";

export const registerRecruiterController = async (req, res, next) => {
    try {
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
        } = req.body;

        // Create a new recruiter instance
        const recruiter = new Recruiter({
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
        });

        // Save the recruiter to the database
        await recruiter.save();

        res.status(201).json({ message: "Recruiter registered successfully" });
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

export const changePasswordStudentController = async (req, res, next) => {
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
            return res.status(404).json({ error: "Student not found" });
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
        } = req.body;
        console.log(recruiterID, req.body);

        // Find the student with the provided student ID
        await Recruiter.findByIdAndUpdate(recruiterID, {
            companyName: companyName,
            natureOfBusiness: natureOfBusiness,
            homePage: homePage,
            contactPerson: contactPerson,
            designation: designation,
            email: email,
            telephoneNo: telephoneNo,
            fax: fax,
            jobDescription: jobDescription,
            address: address,
            eligibilityCriteria: eligibilityCriteria,
            branchesEligible: branchesEligible,
            payPackage: payPackage,
            recruitmentSchedule: recruitmentSchedule,
            selectionProcedure: selectionProcedure,
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

export const updateRecruitRequest = async (req, res) => {
    const recruiterID = req.params.id;
    const { action } = req.body;
    console.log(recruiterID, action);

    try {
        // Find the recruiter by ID
        const recruiter = await Recruiter.findById(recruiterID);

        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        // Update the recruitRequest field based on the action
        recruiter.recruitRequest = action;

        // Save the updated recruiter
        await recruiter.save();

        res.json({ message: "Recruit request updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await Recruiter.find({ recruitRequest: true });
        res.json(recruiters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const matchRequirements = async (req, res) => {
    try {
        // Fetch all recruiters
        const recruiterID = req.params.id;
        const recruiter = await Recruiter.findById(recruiterID);

        // Iterate over each recruiter

        const matchedStudents = [];

        // Fetch all students
        const studentdata = await students.find();

        // Iterate over each student
        for (const student of studentdata) {
            // Check if the student matches the recruiter's requirements
            if (student.cgpa >= recruiter.eligibilityCriteria.btechCutoff) {
                matchedStudents.push(student._id);
            }
        }
        console.log(matchedStudents, recruiterID);

        // Create/update the matched schema for the current recruiter
        await MatchedStudents.create({
            recruiterId: recruiterID,
            studentIds: matchedStudents.map((studentId) => ({ studentId })),
        });

        console.log("Matching completed successfully!");
    } catch (error) {
        console.error("Matching failed:", error);
    }
};
// Get a specific student by ID
export const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await students.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        console.error(`Failed to fetch student with ID ${studentId}:`, error);
        res.status(500).json({ message: "Failed to fetch student" });
    }
};

// Get all companies with matched students
export const getCompaniesWithMatchedStudents = async (req, res) => {
    try {
        const companies = await Recruiter.find(
            {},
            "companyName natureOfBusiness payPackage.grossSalary"
        );
        res.json(companies);
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        res.status(500).json({ message: "Failed to fetch companies" });
    }
}; // Get a specific company and its matched students
export const getCompanyWithMatchedStudents = async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await Recruiter.findById(
            companyId,
            "companyName natureOfBusiness payPackage.grossSalary"
        );
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const matchedStudents = await MatchedStudents.find(
            { recruiterId: companyId },
            "studentIds"
        ).populate({
            path: "studentIds.studentId",
            select: "studentCollegeID username email cgpa skills department",
        });

        res.json({ company, matchedStudents });
    } catch (error) {
        console.error(
            `Failed to fetch company with ID ${companyId} and matched students:`,
            error
        );
        res.status(500).json({
            message: "Failed to fetch company and matched students",
        });
    }
};

    
    // Dummy function to simulate sending a notification
    
