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

  const [credentialsFaculty, setCredentialsFaculty] = useState({
    email: "",
    password: "",
  });
  const [credentialsAdmin, setCredentialsAdmin] = useState({
    studentCollegeID: "",
    password: "",
  });
  const [adminMode, setAdminMode] = useState(false); // State for admin mode
  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleAdminChange = (e) => {
    const updatedCredentialsAdmin = { ...credentialsAdmin, [e.target.id]: e.target.value };
    setCredentialsAdmin(updatedCredentialsAdmin);
  };
  

  const handleFacultyChange = (e) => {
    setCredentialsFaculty((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });


    try {
      let res;

      if (adminMode) {
        
        // admin is defined in student schema hence calling student route
    
        res = await axios.post(
          "http://localhost:8080/api/students/studentLogin",
          credentialsAdmin
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.student });

        if (res.data.student.isAdmin) {
          toast.success("Admin Logged in Successfully!");
          // Handle admin login - redirect to the admin dashboard
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000); // Delay for 2 seconds (2000 milliseconds)
        }
      } else {
        res = await axios.post(
          "http://localhost:8080/api/faculty/facultyLogin",
          credentialsFaculty
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.faculty });
        toast.success("Logged in Successfully!");
        setTimeout(() => {
          navigate("/faculty/home");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
      toast.error("Incorrect credentials!"); // Log the error response for troubleshooting
    }
  };

  return (
    <Box
      height="91.5vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={containerStyle}
    >
      <Box
        bgcolor="white"
        padding="20px 60px"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="10px"
        className="card"
      >
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          {adminMode ? "Admin Login" : "Faculty Login"}
        </Typography>
        <CssTextField
          required
          id={adminMode ? "studentCollegeID" : "email"} // Change the id based on adminMode
          onChange={adminMode ? handleAdminChange : handleFacultyChange}
          label={adminMode ? "Enter your ID" : "Enter your Email"} // Change the label based on adminMode
        />
        <CssTextField
          required
          id="password"
          type="password"
          onChange={adminMode ? handleAdminChange : handleFacultyChange}
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
          <Link to="/faculty/forgot-password">Forgot your password? Reset here</Link>
        </Typography>
        
        {/* Toggle button to switch between admin and faculty login */}
        <Button onClick={() => setAdminMode(!adminMode)}>
          {adminMode ? "Switch to Faculty Login" : "Switch to Admin Login"}
        </Button>
      </Box>
      <Toaster position="bottom-center" /> {/* Add the toast container */}
    </Box>
  );
};

export default Login;
