import React, { useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Login = () => {
  const [credentials, setCredentials] = useState({
    studentCollegeID: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/students/studentLogin",
        credentials
      );
      console.log(res.data); // Log the response data for troubleshooting
      navigate("/student/home");
    } catch (err) {
      console.log(err.response); // Log the error response for troubleshooting
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
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
