import Faculty from "../models/facultyModel.js";
import students from "../models/studentModel.js";
import bcrypt from "bcryptjs";

export const registerfacultyController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    // Create a new recruiter instance

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(409).json({ error: "Faculty already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const faculty = new Faculty({
      email,
      password: hashedPassword,
      // username: "",
      // department: "",
      // isPasswordChanged: false,
    });

    console.log(faculty);

    // Save the recruiter to the database
    await faculty.save();

    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const loginfacultyController = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ username: req.body.username });
    if (!faculty) {
      return next(createError(404, "no faculty with this email"));
    }
    if (req.body.password !== faculty.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", faculty });
  } catch (error) {}
};

export const getStudentsByFaculty = async (req, res) => {
  const email = req.params.facultymail;

  try {
    // Query the database to find students with the faculty email
    const student = await students.find({ facultyEmail: email });

    // Check if any students were found
    if (student.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for the given faculty." });
    }

    // Send the list of students as a response
    res.status(200).json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFacultyProfile = async (req, res) => {
  try {
    const facultyID = req.params.id;
    const faculty = await Faculty.findById(facultyID);
    if (!faculty) {
      return res.status(404).json({
        error: "Faculty not found",
      });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({
      error: "an error occured",
    });
  }
};

export const editFacultyProfile = async (req, res) => {
  try {
    const facultyID = req.params.id;
    const { username, email, password, department } = req.body;
    await Faculty.findByIdAndUpdate(facultyID, {
      username: username,
      email: email,
      password: password,
      department: department,
    });
    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occured while updating profile",
    });
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
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
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
    await students.updateOne({ email: email }, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
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

    res.status(200).json({ message: "isPasswordChanged updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
      console.log("ass");
      return res.status(404).json({ error: "Student not found." });
    }

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
      to: "tve20cs035@cet.ac.in",
      subject: "Message from STUDUP",
      text: `Dear Faculty,

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
    return res
      .status(200)
      .json({ message: "Password reset OTP sent successfully.", data: otp });
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
