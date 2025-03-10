// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./studentHome.css";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CssTextField from "../global/CssTextField";

const StudentHome = () => {
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [flag, setFlag] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const { user } = useContext(AuthContext);
  const id = user._id;

  const dataStudent = useFetch(
    `https://project-api-iwiy.onrender.com/api/students/StudentProfile/${id}`
  );
  const student = dataStudent.data;

  useEffect(() => {
    // Check if the password has been updated
    if (student && student.password === "") {
      setFlag(true);
    }
  }, [student]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://project-api-iwiy.onrender.com/api/students/StudentPassword/${id}`,
        {
          newPassword: password,
        }
      );
      setSnackbarOpen(true);
      setPassword("");
      setFlag(false);
      setPasswordUpdated(true);
    } catch (err) {
      console.log(err.response); // Log the error response for troubleshooting
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      className="backgroundRounded "
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(/assets/studentHome.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container home mt-5" style={{ justifyContent: "center" }}>
        {flag ? (
          <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bgcolor="white"
              padding="20px 60px"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap="10px"
            >
              <Typography variant="h5" marginTop="10px" marginBottom="30px">
                Update Password
              </Typography>
              <CssTextField
                required
                id="password"
                type="password"
                value={password}
                onChange={handleChange}
                label="New Password"
                disabled={passwordUpdated} // Disable the input if password is already updated
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={passwordUpdated} // Disable the button if password is already updated
              >
                Update
              </Button>
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Password updated successfully"
            />
          </Box>
        ) : (
          <div
            className="cardhome"
            style={{
              maxWidth: "35rem",
              margin: "40px auto",
              marginBottom: "40px",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #20313e",
              overflowY: "auto",
              maxHeight: "calc(100vh - 180px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)", // 90% opacity white background
              backdropFilter: "blur(10px)", // Apply a blur effect for a frosted glass look
              borderRadius: "10px",
            }}
          >
            <div className="item">
              <div className="details">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h1 className="itemTitle" style={{ marginRight: "10px" }}>
                    {student.username}
                  </h1>
                  {student.isVerified ? (
                    <img
                      src="/assets/verifiedStudent.jpg"
                      alt="Verified"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <img
                      src="/assets/notVerified.jpg"
                      alt="Unverified"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </div>

                <div className="detailItem">
                  <span className="itemKey">College ID:</span>
                  <span className="itemValue">{student.studentCollegeID}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{student.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+91 {student.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">S2 Credits:</span>
                  <span className="itemValue">{student.creditss2}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">S3 Credits:</span>
                  <span className="itemValue">{student.creditss3}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">S4 Credits:</span>
                  <span className="itemValue">{student.creditss4}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">S5 Credits:</span>
                  <span className="itemValue">{student.creditss5}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">S6 Credits:</span>
                  <span className="itemValue">{student.creditss6}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{student.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">{student.dob}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Department:</span>
                  <span className="itemValue">{student.department}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Faculty Email:</span>
                  <span className="itemValue">{student.facultyEmail}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Blood Group:</span>
                  <span className="itemValue">{student.bloodGroup}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{student.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Aadhaar No:</span>
                  <span className="itemValue">{student.aadhaar}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Domicile State:</span>
                  <span className="itemValue">{student.domicileState}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Religion:</span>
                  <span className="itemValue">{student.religion}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{student.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mother Tongue:</span>
                  <span className="itemValue">{student.motherTongue}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tenth Grade:</span>
                  <span className="itemValue">{student.tenthgrade}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Twelth Grade:</span>
                  <span className="itemValue">{student.plustwograde}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CGPA:</span>
                  <span className="itemValue">{student.cgpa}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cleared Backlogs:</span>
                  <span className="itemValue">{student.clearedBacklogs}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Non-Cleared Backlogs:</span>
                  <span className="itemValue">
                    {student.nonclearedBacklogs}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Keam Rank:</span>
                  <span className="itemValue">{student.rank}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admission Quota:</span>
                  <span className="itemValue">{student.admissionQouta}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admission Number:</span>
                  <span className="itemValue">{student.admissionNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admitted Scheme:</span>
                  <span className="itemValue">{student.admittedScheme}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admitted Program:</span>
                  <span className="itemValue">{student.admittedProgram}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admitted Type:</span>
                  <span className="itemValue">{student.admittedType}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Skills:</span>
                  <span className="itemValue">
                    {student && student.skills && (
                      <div>{student.skills.join(", ")}</div>
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CV:</span>
                  <span className="itemValue">{student.cv}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHome;
