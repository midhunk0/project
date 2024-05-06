// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import StudentProfileModal from "./StudentProfileModal";
import "./FacultyHome.css"; // Import the CSS file

const FacultyHome = () => {
  const { user } = useContext(AuthContext);
  const facultymail = user.email;

  const facName = user.username;
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleVerify = async (updatedStudent) => {
    try {
      const updatedStudents = students.map((s) =>
        s._id === updatedStudent._id ? updatedStudent : s
      );
      setStudents(updatedStudents);

      await axios.put(
        `http://localhost:8080/api/students/StudentProfile/${updatedStudent._id}`,
        updatedStudent
      );
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/faculty/facultystudent/${facultymail}`
      );
      setStudents(response.data.student);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      className="faculty-home-container" // Add class name for container styles
    >
      <Box boxShadow={3} borderRadius={5} padding={3} bgcolor="white">
        <img
          src="../../assets/classroom.png"
          alt="Company_image"
          className="faculty-home-image" // Add class name for image styles
        />
        <Typography variant="h3" className="faculty-home-heading"> {/* Add class name for heading styles */}
          {user.username}
        </Typography>
      </Box>
      <Grid item xs={12}>
        <table className="faculty-home-table"> {/* Add class name for table styles */}
          {/* Table header */}
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>View Full Profile</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.username}</td>
                <td>{student.studentCollegeID}</td>
                <td>
                  <button onClick={() => handleViewProfile(student)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
      {/* Display the modal */}
      {selectedStudent && (
        <StudentProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={selectedStudent}
          onVerify={handleVerify}
        />
      )}
    </Grid>
  );
};

export default FacultyHome;