import React from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
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

const RecruiterRegister = () => {
  const colors = tokens();

  return (
    <Box
      height="91.6vh"
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
          Register
        </Typography>
        <CssTextField required label="Name" />
        <CssTextField required label="Email" type="email" />
        <CssTextField required label="Password" type="password" />
        <Button variant="contained" sx={{ background: colors.gray[100], '&:hover': { background: colors.gray[100] } }}>
          Sign Up
        </Button>
        <Typography variant="h6">
          Already have an account?{" "}
          <Link to="/recruiter/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RecruiterRegister;
