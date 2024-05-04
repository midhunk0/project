import Recruiter from "../models/recruiterModel.js";
// import MatchedStudents from "../models/matchedModel.js";
import students from "../models/studentModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

export const registerRecruiterController = async (req, res, next) => {
    try {
        const { companyName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new recruiter instance
        const recruiter = new Recruiter({
            companyName,
            email,
            password: hashedPassword,
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
        const pass = req.body.password;
        if (!recruiter) {
            return next(createError(404, "no recruiter with this email"));
        }
        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(
            pass,
            recruiter.password
        );
        if (!isPasswordCorrect) {
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
        const {
            companyName,
            email,
            natureOfBuisiness,
            contactPerson,
            designation,
            phoneNo,
            address,
        } = req.body;
        console.log(recruiterID, req.body);

        // Find the student with the provided student ID
        await Recruiter.findByIdAndUpdate(recruiterID, {
            companyName: companyName,
            email: email,
            natureOfBuisiness: natureOfBuisiness,
            contactPerson: contactPerson,
            designation: designation,
            phoneNo: phoneNo,
            address: address,
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

//to fetch recruiters from a list of company ids
export const getRecruitersByCompanyIds = async (req, res) => {
    try {
        // Extract the companyIds array from the request body
        const { companyIds } = req.body;

        // Assuming you have a database model for recruiters
        // Fetch recruiters based on the companyIds array
        const recruiters = await Recruiter.find({ _id: { $in: companyIds } });

        // Send the fetched recruiters as the response
        res.json(recruiters);
    } catch (error) {
        console.error("Error fetching recruiters:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Controller to get recruiters whose isJafSent is true
export const getRecruitersSentJaf = async (req, res) => {
    try {
        const recruiters = await Recruiter.find({ isJafSent: true });
        res.status(200).json(recruiters);
    } catch (error) {
        console.error("Error fetching recruiters:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const recruiterJafController = async (req, res) => {
    try {
        const recruiterid = req.params.id;
        const isjafsent = false;
        await Recruiter.findByIdAndUpdate(recruiterid, {
            isJafSent: isjafsent,
        });

        res.status(200).json({ message: "isjafsent changed successfully" });
    } catch (error) {
        next(error);
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

export const getUnverifiedRecruiters = async (req, res) => {
    try {
        const unverifiedRecruiters = await Recruiter.find({ verified: false });

        // Check if any unverified recruiters were found
        if (unverifiedRecruiters.length === 0) {
            return res
                .status(404)
                .json({ error: "No unverified recruiters found" });
        }

        res.status(200).json(unverifiedRecruiters);
    } catch (error) {
        console.error("Error fetching unverified recruiters:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// recruiterController.js

export const verifyRecruiter = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(
            recruiterId,
            { verified: true }
        );
        res.status(200).json(updatedRecruiter);
    } catch (error) {
        console.error("Error verifying recruiter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const rejectRecruiter = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        await Recruiter.findByIdAndDelete(recruiterId);
        res.status(200).json({ message: "Recruiter rejected successfully" });
    } catch (error) {
        console.error("Error rejecting recruiter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateIsPasswordChangedController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const { isPasswordChanged } = req.body;
        console.log(isPasswordChanged);

        // Find the student by ID and update isPasswordChanged
        await Recruiter.findByIdAndUpdate(id, { isPasswordChanged });

        res.status(200).json({
            message: "isPasswordChanged updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updatePasswordController = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { id } = req.params; // Extract the ID from request params

    try {
        // Fetch the recruiter from the database using findById
        const recruiter = await Recruiter.findById(id);

        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }

        // Check if the old password matches the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            recruiter.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Incorrect old password" });
        }

        // Check if the new password matches the confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                error: "New password and confirm password do not match",
            });
        }

        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Use a salt rounds value, e.g., 10

        // Update the recruiter's password in the database
        recruiter.password = hashedNewPassword;
        await recruiter.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateForgotPasswordController = async (req, res) => {
    const { newPassword, email } = req.body;
    

    if (!newPassword) {
        return res.status(400).json({ error: "New password is required." });
    }

    try {
        // Hash the new password before updating
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the password in the database
        await Recruiter.updateOne(
            { email: email },
            { password: hashedPassword }
        );

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPasswordController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const otp = generateOTP();
    const { email, captcha } = req.body;

    try {
        // Check if the student with the provided email and studentCollegeID exists
        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found." });
        }

        const recruiter_email = recruiter.email;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "temp200659@cet.ac.in",
                pass: "rulj xmwv znic iksd",
            },
        });

        const mailOptions = {
            from: '"Placement Officer" <temp200659@cet.ac.in>',
            to: recruiter_email,
            subject: "Message from STUDUP",
            text: `Dear Student,

We hope this message finds you well.
Your OTP is: ${otp}`,
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
        });

        // Send password reset OTP logic (this can be a separate function or integrated here)

        // Return success message
        return res.status(200).json({
            message: "Password reset OTP sent successfully.",
            data: otp,
        });
    } catch (error) {
        console.log("Error sending OTP:", error.message);
        return res
            .status(500)
            .json({ error: "Internal server error. Please try again later." });
    }
};

export const verifyOTPController = async (req, res) => {
    try {
        console.log(req.body);
        const { otp, correct_otp } = req.body;

        // Assuming you have the user ID from authentication

        // Retrieve the stored OTP from the database based on the user ID

        if (!correct_otp) {
            return res.status(404).json({ error: "OTP not found" });
        }

        // Compare the OTPs
        if (otp !== correct_otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // If OTP is valid, mark it as used or delete it from the database
        // This step depends on your application's logic

        // Send a success response
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
