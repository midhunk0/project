import React, { useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});

const StudentLogin=()=>{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    const colors=tokens();
    const handleUsername=(e)=>{
        setUsername(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }
    const handleLogin=()=>{
        if(username==="" && password===""){
            console.log("Login successful!");
            navigate("/student");
        }
    }
    return(
        <Box
            height="91.5vh"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{background:colors.blueAccent[800]}}
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
                <Typography variant="h5" marginTop="10px" marginBottom="30px">Login</Typography>
                <CssTextField required value={username} onChange={handleUsername} label="Enter your name"/>
                <CssTextField required value={password} onChange={handlePassword} label="Password" type="password"/>
                <Button variant="contained" style={{background:colors.blueAccent[500]}} onClick={handleLogin}>Sign In</Button>
            </Box>
        </Box>
    )
}

export default StudentLogin;