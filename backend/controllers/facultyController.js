import Faculty from "../models/facultyModel.js";
import students from "../models/studentModel.js";

export const registerfacultyController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Create a new recruiter instance
    const faculty = new Faculty({
      username,
      password
    });

    // Save the recruiter to the database
    await faculty.save();

    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (error) {
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
