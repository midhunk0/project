import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom"; 
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import axios from "axios";

const RecruiterLogin=()=>{
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const navigate=useNavigate();
    const { user, loading, error, dispatch } = useContext(AuthContext);
    const colors=tokens();
    // const handleUsername=(e)=>{
    //     setUsername(e.target.value);
    // }
    // const handlePassword=(e)=>{
    //     setPassword(e.target.value);
    // }
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleLogin=async(e)=>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterLogin",
                credentials
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.recruiter });
            navigate("/recruiter/home");
        } catch (err) {
            console.log(err.response); // Log the error response for troubleshooting
        }
    }
    return(
        <Box 
            height="91.5vh"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="whitesmoke"
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
                    Login
                </Typography>
                <CssTextField required id="email" onChange={handleChange} label="Enter your email"/>
                <CssTextField required id="password" onChange={handleChange} label="Password" type="password"/>
                <Button variant="contained" sx={{background:colors.gray[100],'&:hover':{background:colors.gray[100]}}} onClick={handleLogin}>Sign In</Button>
                <Typography variant="h6">
                    Don't have an account?{" "}
                    <Link to="/recruiter/register" style={{ textDecoration:"none" }}>
                        Register
                    </Link>
                </Typography>            
            </Box>
        </Box>
    )
}

export default RecruiterLogin;


