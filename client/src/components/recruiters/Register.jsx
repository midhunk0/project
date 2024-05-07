/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import toast, { Toaster } from "react-hot-toast";

const colors = tokens();

const RecruiterRegister = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "91.5vh",
      width: "100%",
      backgroundColor: "whitesmoke",
    },
    formContainer: {
      backgroundColor: "white",
      padding: "20px 60px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "10px",
    },
    heading: {
      variant: "h5",
      marginTop: "10px",
      marginBottom: "30px",
    },
    textField: {
      width: "100%",
    },
    button: {
      background: colors.gray[100],
      "&:hover": { background: colors.gray[100] },
    },
    registerLink: {
      variant: "h6",
    },
  };

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://project-api-iwiy.onrender.com/api/recruiters/recruiterRegister",
        formData
      );

      toast.success("Recruiter registered successfully!");
      setFormData({
        companyName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err.response);
      toast.error("Registration failed!");
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.heading}>Register</Typography>
        <CssTextField
          name="companyName"
          required
          label="Company Name"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          sx={styles.textField}
        />
        <CssTextField
          name="email"
          required
          label="Email ID"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={styles.textField}
        />
        <CssTextField
          name="password"
          required
          label="Enter a Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={styles.textField}
        />
        <Button variant="contained" sx={styles.button} onClick={handleSubmit}>
          Register
        </Button>
        <Typography sx={styles.registerLink}>
          Already registered?{" "}
          <Link to="/recruiter/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default RecruiterRegister;
