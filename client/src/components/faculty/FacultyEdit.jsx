// @ts-nocheck
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CssTextField from '../global/CssTextField';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';

const FacultyEdit = () => {
    const facultyData = JSON.parse(localStorage.getItem("user"));
    const [facultyDetails, setFacultyDetails] = useState(facultyData || {})
    const id = facultyDetails._id;

    const handleChange = (e) => {
        setFacultyDetails((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.put(
                `http://localhost:8080/api/faculty/facultyEdit/${id}`,
                facultyDetails
            )
            toast.success("Profile updated successfully!");
            localStorage.setItem("user", JSON.stringify(facultyDetails));
        }
        catch(error){
            toast.error("Profile updation failed");
        }
    };

    const renderTextField = (name, label, required = true, type = "text") => (
        <CssTextField
            name={name}
            required={required}
            label={label}
            type={type}
            value={facultyDetails[name] || ""}
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
            <Toaster/>
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
                {renderTextField("username", "User Name")}
                {renderTextField("email","Email")}
                {renderTextField("password", "Password")}
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    )
}

export default FacultyEdit