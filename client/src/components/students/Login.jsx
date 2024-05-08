import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";

const colors = tokens();
const Login = () => {
  const containerStyle = {
    background: "url(../../../assets/loginBg.jpeg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [credentials, setCredentials] = useState({
    studentCollegeID: "",
    password: "",
  });
  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://project-api-iwiy.onrender.com/api/students/studentLogin",
        credentials
      );
      const loggedInStudent = res.data.student;

      dispatch({ type: "LOGIN_SUCCESS", payload: loggedInStudent });
      if (!loggedInStudent.isPasswordChanged) {
        // If isPasswordChecked is false, redirect to change password page
        navigate("/update-password");
      } else {
        toast.success("Student Logged in Successfully!");
        setTimeout(() => {
          navigate("/student/home");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
      toast.error("Incorrect credentials!"); // Log the error response for troubleshooting
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={containerStyle}
      padding={{ xs: "20px", sm: "50px" }} // Adjust padding for different screen sizes
    >
      <Box
        bgcolor="white"
        padding="20px"
        borderRadius="10px"
        maxWidth="300px" // Limit maximum width for better responsiveness
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="10px"
        className="card"
      >
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          Student Login
        </Typography>
        <CssTextField
          required
          id="studentCollegeID"
          onChange={handleChange}
          label="Enter your collegeID"
        />
        <CssTextField
          required
          id="password"
          type="password"
          onChange={handleChange}
          label="Password"
        />
        <Button
          variant="contained"
          sx={{
            background: colors.gray[100],
            "&:hover": { background: colors.gray[100] },
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Typography variant="body2" marginTop="10px">
          <Link to="/student/forgot-password">
            Forgot your password? Reset here
          </Link>
        </Typography>
      </Box>
      <Toaster position="bottom-center" /> {/* Add the toast container */}
    </Box>
  );
};

export default Login;
