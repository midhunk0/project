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
        "http://localhost:8080/api/recruiters/recruiterRegister",
        formData
      );
      console.log(res.data);

      // const recruiterId = res.data._id;

      // Step 2: Create a new conversation between admin and recruiter
      const conversationResponse = await axios.post(
        "http://localhost:8080/api/students/conversations",
        {
          senderId: "6494405c573b71cfcda5f70e", // Replace with the actual admin user ID
          receiverId: res.data._id,
        }
      );
      toast.success("Recruiter registered successfully!");
      setFormData({
        companyName: "",
        email: "",
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
