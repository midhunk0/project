import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
                "http://localhost:8080/api/students/studentLogin",
                credentials
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.student });

            // Check if the logged-in user is an admin
            if (res.data.student.isAdmin) {
                toast.success("Admin Logged in Successfully!");
                // Handle admin login - redirect to the admin dashboard
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 1000); // Delay for 2 seconds (2000 milliseconds)
            } else {
                toast.success("Student Logged in Successfully!");
                // Handle student login - redirect to the student dashboard
                setTimeout(() => {
                    navigate("/student/home");
                }, 1000); // Delay for 2 seconds (2000 milliseconds)
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
                    Login
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
            </Box>
            <Toaster position="bottom-center" /> {/* Add the toast container */}
        </Box>
    );
};

export default Login;
