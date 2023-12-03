import students from "../models/studentModel.js";
import bcrypt from "bcryptjs";

export const registerStudentController = async (req, res, next) => {
    try {
        const { studentCollegeID, cgpa } = req.body;
        console.log(studentCollegeID, cgpa);
        // Check if the student with the provided student ID already exists
        const existingStudent = await students.findOne({ studentCollegeID });
        if (existingStudent) {
            return res.status(409).json({ error: "Student already exists" });
        }

        // Create a new student instance
        const student = new students({
            username: "",
            password: "",
            email: "",
            studentCollegeID: req.body.studentCollegeID,
            phone: "",
            faculty: "",
            address: "",
            cgpa: req.body.cgpa,
            skills: [""],
            department: "",
            backlogs: 0,
            profilePicture: "",
            cv: "",
            isAdmin: false,
            isVerified: false,
        });

        // Save the student to the database
        await student.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        next(error);
        // res.status(500).json({ error: "An error occurred" });
    }
};

export const loginStudentController = async (req, res) => {
    try {
        const { studentCollegeID, password } = req.body;

        // Check if the student with the provided student ID exists
        const student = await students.findOne({ studentCollegeID });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the provided password is correct
        if (password !== student.password) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     student.password
        // );
        // if (!isPasswordCorrect)
        //     return res.status(401).json({ error: "Invalid password" });

        res.status(200).json({ message: "Login successful", student });
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
            gender,
            dob,
            faculty,
            bloodGroup,
            aadhar,
            phone,
            address,
            nationality,
            religion,
            category,
            motherTongue,
            plus2,
            rank,
            admissionQouta,
            admissionNumber,
            admittedScheme,
            admittedProgram,
            department,
            admittedType,
            cgpa,
            skills,
            backlogs,
            profilePicture,
            cv,
            isAdmin,
            isVerified,
        } = req.body;
        console.log(studentID, req.body);

        // Find the student with the provided student ID
        await students.findByIdAndUpdate(studentID, {
            username: username,
            email: email,
            password: password,
            studentCollegeID: studentCollegeID,
            gender: gender,
            dob: dob,
            faculty: faculty,
            bloodGroup: bloodGroup,
            aadhar: aadhar,
            phone: phone,
            address: address,
            nationality: nationality,
            religion: religion,
            category: category,
            motherTongue: motherTongue,
            plus2: plus2,
            rank: rank,
            admissionQouta: admissionQouta,
            admissionNumber: admissionNumber,
            admittedScheme: admittedScheme,
            admittedProgram: admittedProgram,
            department: department,
            admittedType: admittedType,
            cgpa: cgpa,
            skills: skills,
            backlogs: backlogs,
            profilePicture: profilePicture,
            cv: cv,
            isAdmin: isAdmin,
            isVerified: isVerified,
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

export const uploadExcelStudentController = async (req, res) => {
    try {
        // Process the uploaded Excel file and register students
        // ...

        res.status(200).json({
            message: "Registration from Excel file completed",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const changePasswordStudentController = async (req, res, next) => {
    try {
        const studentID = req.params.id;
        const { newPassword } = req.body;

        await students.findByIdAndUpdate(studentID, { password: newPassword });
        // const { newPassword } = req.body;

        // await students.findByIdAndUpdate(studentID, { password: newPassword });
        // // Find the student with the provided student ID
        // const student = await students.findById(studentID);
        // if (!student) {
        //     return res.status(404).json({ error: "Student not found" });
        // }

        // // Check if the current password is correct
        // if (currentPassword !== student.password) {
        //     return res.status(401).json({ error: "Invalid password" });
        // }

        // // Update the password
        // student.password = newPassword;

        // Save the updated password
        // await student.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        console.log(err);
        next(err);
        // res.status(500).json({ error: "An error occurred" });
    }
};

export const addProfileDetailsStudentController = async (req, res) => {
    try {
        const studentID = req.params.id;
        const { address } = req.body;

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
