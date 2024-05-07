import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CssTextField from "../global/CssTextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RecruiterRegister = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [recruiterDetails, setRecruiterDetails] = useState(userdata || {});

  const id = recruiterDetails._id;

  const handleChange = (e) => {
    setRecruiterDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(recruiterDetails);
      const res = await axios.put(
        `https://project-api-iwiy.onrender.com/api/recruiters/recruiterProfile/${id}`,
        recruiterDetails
      );
      toast.success("Recruiter profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(recruiterDetails));
      // Reset the form
    } catch (err) {
      console.log(err.response);
      toast.error("Updation failed!");
    }
  };

  const renderTextField = (name, label, required = true, type = "text") => (
    <CssTextField
      name={name}
      required={required}
      label={label}
      type={type}
      value={recruiterDetails[name] || ""}
      onChange={handleChange}
    />
  );

  return (
    <Box
      padding="20px 60px"
      display="flex"
      flexDirection="column"
      gap="20px"
      margin="20px"
      border="1px solid gray"
      borderRadius="5px"
      sx={{ boxShadow: "1px 2px 9px gray" }}
    >
      <Toaster />
      <Typography variant="h4" marginBottom="20px">
        Edit Profile
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
        gap="20px"
      >
        {renderTextField("companyName", "Company Name")}
        {renderTextField(
          "natureOfBusiness",
          "Nature of Business (IT, R&D, etc)"
        )}
      </Box>

      <Box
        marginTop="30px"
        border="1px solid gray"
        borderRadius="5px"
        padding="15px"
      >
        <Typography variant="h6" marginBottom="20px">
          Contact Information
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          }}
          gap="20px"
        >
          {renderTextField("contactPerson", "Contact Person")}
          {renderTextField("designation", "Designation")}
          {renderTextField("phoneNo", "Phone No")}
          {renderTextField("email", "Email ID")}
          {renderTextField("address", "Address", true, "textarea")}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button
          component={Link}
          to="/recruiter/home"
          variant="outlined"
          color="secondary"
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default RecruiterRegister;
