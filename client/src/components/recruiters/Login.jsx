import React, { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "@mui/material";


const colors = tokens();

const BoxStyle = {
  bgcolor: "white",
  padding: "20px 60px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "600px", // Default maxWidth
};

const SmallScreenStyle = {
  ...BoxStyle,
  maxWidth: "300px", // MaxWidth for small screens
};

const LargeScreenStyle = {
  ...BoxStyle,
  maxWidth: "600px", // MaxWidth for larger screens
};


const RecruiterLogin = () => {
  const containerStyle = {
    background: "url(../../../assets/loginBg.jpeg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://project-api-iwiy.onrender.com/api/recruiters/recruiterLogin",
        credentials
      );
      const loggedInRecruiter = res.data.recruiter;

      if (!loggedInRecruiter.verified) {
        toast.error(
          "Your account is not verified. Please wait for verification."
        );
        return; // Stop further execution
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: loggedInRecruiter });
      if (!loggedInRecruiter.isPasswordChanged) {
        // If isPasswordChecked is false, redirect to change password page
        navigate("/recruiter/update-password");
      } else {
        toast.success("Recruiter Logged in Successfully!");
        setTimeout(() => {
          navigate("/recruiter/home");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <Box
      height="91.5vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="whitesmoke"
      style={containerStyle}
    >
      <Box sx={BoxStyle}
        style={isSmallScreen ? SmallScreenStyle : LargeScreenStyle}
      >

        
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          Recruiter Login
        </Typography>
        <CssTextField
          required
          id="email"
          onChange={handleChange}
          label="Enter your email"
        />
        <CssTextField
          required
          id="password"
          onChange={handleChange}
          label="Password"
          type="password"
        />
        <Button
          variant="contained"
          sx={{
            background: colors.gray[100],
            "&:hover": { background: colors.gray[100] },
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Typography variant="body2" marginTop="10px">
          <Link to="/recruiter/forgot-password">
            Forgot your password? Reset here
          </Link>
        </Typography>
        <Typography variant="h6">
          Don't have an account?{" "}
          <Link to="/recruiter/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Box>
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default RecruiterLogin;
