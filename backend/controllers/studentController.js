// @ts-nocheck
import students from "../models/studentModel.js";
import Recruiter from "../models/recruiterModel.js";
import { createError } from "../utils/error.js";
import { check, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerStudentController = async (req, res, next) => {
    try {
        const {
            studentCollegeID,
            department,
            email,
            password, // Assuming password is included in the request body
        } = req.body;

        // Check if the student with the provided student ID already exists
        const existingStudent = await students.findOne({ studentCollegeID });
        if (existingStudent) {
            return res.status(409).json({ error: "Student already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new student instance with hashed password
        const student = new students({
            username: "",
            password: hashedPassword, // Save the hashed password
            email,
            semester: 2,
            studentCollegeID,
            phone: "",
            gender: "",
            dob: "",
            bloodGroup: "",
            facultyEmail: "",
            aadhaar: "",
            address: "",
            domicileState: "",
            religion: "",
            category: "",
            motherTongue: "",
            tenthgrade: "",
            plustwograde: "",
            cgpa: "",
            rank: "",
            admissionQouta: "",
            admissionNumber: "",
            admittedScheme: "",
            admittedProgram: "",
            skills: [""],
            department,
            admittedType: "",
            clearedBacklogs: "",
            nonclearedBacklogs: "",
            profilePicture: "",
            isAdmin: false,
            isVerified: false,
            isPasswordChanged: false,
        });

        // Save the new student to the database
        await student.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const loginStudentController = async (req, res) => {
    try {
        const { studentCollegeID, password } = req.body;
        console.log(studentCollegeID);
        console.log(password);

        // Check if the student with the provided student ID exists
        const student = await students.findOne({ studentCollegeID });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            student.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
            { id: student._id, isAdmin: student.isAdmin },
            process.env.JWT
        );
        res.status(200).json({
            message: "Login successful",
            student,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const getProfileStudentController = async (req, res) => {
    try {
        const studentID = req.params.id;

        // Find the student with the provided student ID
        const student = await students.findById(studentID);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const updateProfileStudentController = async (req, res) => {
    try {
        const studentID = req.params.id;
        const {
            username,
            email,
            password,
            studentCollegeID,
            semester,
            gender,
            dob,
            facultyEmail,
            bloodGroup,
            phone,
            address,
            domicileState,
            religion,
            category,
            motherTongue,
            plustwograde,
            tenthgrade,
            aadhaar,
            rank,
            clearedBacklogs,
            nonclearedBacklogs,
            admissionQouta,
            admissionNumber,
            admittedScheme,
            admittedProgram,
            department,
            admittedType,
            cgpa,
            skills,
            profilePicture,
            cv,
            isAdmin,
            isVerified,
            isPasswordChanged,
        } = req.body;
        console.log(studentID, req.body);

        // Find the student with the provided student ID
        await students.findByIdAndUpdate(studentID, {
            username: username,
            email: email,
            password: password,
            studentCollegeID: studentCollegeID,
            semester: semester,
            gender: gender,
            dob: dob,
            facultyEmail: facultyEmail,
            bloodGroup: bloodGroup,
            aadhaar: aadhaar,
            clearedBacklogs: clearedBacklogs,
            nonclearedBacklogs: nonclearedBacklogs,
            phone: phone,
            address: address,
            domicileState: domicileState,
            religion: religion,
            category: category,
            motherTongue: motherTongue,
            plustwograde: plustwograde,
            tenthgrade: tenthgrade,
            rank: rank,
            admissionQouta: admissionQouta,
            admissionNumber: admissionNumber,
            admittedScheme: admittedScheme,
            admittedProgram: admittedProgram,
            department: department,
            admittedType: admittedType,
            cgpa: cgpa,
            skills: skills,
            profilePicture: profilePicture,
            cv: cv,
            isAdmin: isAdmin,
            isVerified: isVerified,
            isPasswordChanged: isPasswordChanged,
        });

        res.status(200).json({
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const updatePasswordController = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body; // Assuming studentId is available in req.user after authentication

    try {
        // Fetch the student from the database
        const student = await students.findById(req.params.id);
        console.log(student);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the old password matches the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            student.password
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

        // Update the student's password in the database
        student.password = hashedNewPassword;
        await student.save();

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
        await students.updateOne(
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

export const updateIsPasswordChangedController = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the student ID is passed in the URL params
        console.log(req.params);
        const { isPasswordChanged } = req.body;
        console.log(req.body);

        // Find the student by ID and update isPasswordChanged
        await students.findByIdAndUpdate(id, { isPasswordChanged });

        res.status(200).json({
            message: "isPasswordChanged updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addProfileDetailsStudentController = async (req, res) => {
    try {
        const studentID = req.params.id;
        const { address } = req.body;
        console.log(address);

        // Find the student with the provided student ID
        const student = await students.findById(studentID);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Update the student profile with additional details
        student.address = address;

        // Save the updated student profile
        await student.save();

        res.status(200).json({
            message: "Profile details added successfully",
            student,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
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
    const { email, studentCollegeID, captcha } = req.body;

    try {
        // Check if the student with the provided email and studentCollegeID exists
        const student = await students.findOne({ email, studentCollegeID });
        if (!student) {
            return res.status(404).json({ error: "Student not found." });
        }

        const fetchStudent = student.email;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "temp200659@cet.ac.in",
                pass: "rulj xmwv znic iksd",
            },
        });

        const mailOptions = {
            from: '"Placement Officer" <temp200659@cet.ac.in>',
            to: fetchStudent,
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

export const getallStudentsController = async (req, res) => {
    try {
        // Fetch all students from the database
        const fetchedStudents = await students.find();

        // Send the students as the response
        res.json(fetchedStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while retrieving students.",
        });
    }
};

//to update student credits
export const updateCredits = async (req, res) => {
    const { id } = req.params;
    const { semester } = req.body;
    console.log(id, semester, 5);

    try {
        let updatedStudent;

        // Find the student by ID
        updatedStudent = await students.findById(id);

        // Update credits based on the semester
        switch (semester) {
            case 1:
                updatedStudent.creditss1 += 5;
                break;
            case 2:
                updatedStudent.creditss2 += 5;
                break;
            case 3:
                updatedStudent.creditss3 += 5;
                break;
            case 4:
                updatedStudent.creditss4 += 5;
                break;
            case 5:
                updatedStudent.creditss5 += 5;
                break;
            case 6:
                updatedStudent.creditss6 += 5;
                break;
            default:
                return res.status(400).json({ message: "Invalid semester" });
        }

        // Save the updated student
        await updatedStudent.save();

    res.status(200).json({ message: "Credits updated successfully" });
  } catch (error) {
    console.error("Error updating credits:", error);
    res.status(500).json({ message: "Failed to update credits" });
  }
};
