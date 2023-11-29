// Import necessary libraries and components
import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Main component
const RecruiterRegister = () => {
    // Define the initial state for form data
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",

    });

    // Define the colors variable using the tokens function
    const colors = tokens(); // Make sure you have a theme file with a tokens function

    // Handle regular input changes
    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle checkbox changes in the table


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filter only checked rows
            

            // Send data to the server
            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterRegister",
                {
                    ...formData,
                }
            );
            toast.success("Recruiter registered successfully!");

            // Reset the form
            setFormData({
                companyName: "",
                email: "",

            });
        } catch (err) {
            console.log(err.response);
            toast.error("Registration failed!");
        }
    };

    // Render text input fields
    const renderTextField = (name, label, required = true, type = "text") => (
        <CssTextField
            name={name}
            required={required}
            label={label}
            type={type}
            value={formData[name]}
            onChange={handleChange}
        />
    );


    // Main return block
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
                Register
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
            </Box>

            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                }}
                gap="20px"
            >
                {renderTextField("email", "Email ID")}
            </Box>




            {/* Submit button */}
            <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                sx={{
                    marginTop: "30px",
                    backgroundColor: colors.secondary,
                    color: colors.white,
                }}
            >
                Register
            </Button>

            {/* Login link */}
            <Typography variant="body1" marginTop="20px" textAlign="center">
                Already registered? <Link to="/recruiter/login">Login</Link>
            </Typography>

            {/* Render the recruitment status table */}

        </Box>
    );
};

// Export the component
export default RecruiterRegister;
