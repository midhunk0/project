import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});

const Register=()=>{
    return(
        <Box
            height="91.6vh"
            width="100%"
            component="form"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="whitesmoke"
            sx={{
                "& .MuiTextField-root": { m:1, width:"25ch" }
            }}
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
                <Typography variant="h5" marginTop="10px" marginBottom="30px">Register</Typography>
                <CssTextField required label="Enter your name"/>
                <CssTextField required label="Enter your email" type="email"/>
                <CssTextField required label="Password" type="password"/>
                <Button variant="contained" color="success">Sign Up</Button>
                <Typography variant="h6">
                    Do you have an account? 
                    <Link to="/student/login" style={{ textDecoration:"none" }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Register;