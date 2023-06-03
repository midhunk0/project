import React from "react";
// import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography, styled } from "@mui/material";

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

const Login=()=>{
    return(
        <Box
            height="91.5vh"
            width="100%"
            component="form"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="whitesmoke"
            sx={{
                "& MuiTextField-root": { m:1, width:"25ch" }
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
                <Typography variant="h5" marginTop="10px" marginBottom="30px">Login</Typography>
                <CssTextField required label="Enter your name"/>
                <CssTextField required label="Password" type="password"/>
                <Button variant="contained" color="success" >Sign In</Button>
                {/* <Typography variant="h6">
                    Don't have an account? 
                    <Link to="/student/register" style={{ textDecoration:"none" }}>
                        Register
                    </Link>
                </Typography> */}
            </Box>
        </Box>
    )
}

export default Login;