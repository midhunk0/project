import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RecruiterRegister = () => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    const [recruiterDetails, setRecruiterDetails] = useState(userdata || {});

    const colors = tokens();
    const id = recruiterDetails._id;

    // useEffect(() => {
    //     setRecruiterDetails(userdata);
    // }, [userdata]);

    const handleChange = (e) => {
        setRecruiterDetails((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setRecruiterDetails((prevData) => {
            if (checked) {
                return {
                    ...prevData,
                    branchesEligible: [...prevData.branchesEligible, value],
                };
            } else {
                const updatedBranches = prevData.branchesEligible.filter(
                    (branch) => branch !== value
                );
                return {
                    ...prevData,
                    branchesEligible: updatedBranches,
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(recruiterDetails);
            const res = await axios.put(
                `http://localhost:8080/api/recruiters/recruiterProfile/${id}`,
                recruiterDetails
            );
            toast.success("Recruiter profile updated successfully!");
            localStorage.setItem("user", JSON.stringify(recruiterDetails));
            // Reset the form
        } catch (err) {
            console.log(err.response);
            toast.error("Registration failed!");
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

    const renderRadioGroup = (name, label, options) => (
        <Box
            display="flex"
            justifyContent="space-between"
            gap="20px"
            style={{ alignItems: "center" }}
        >
            <FormLabel sx={{ m: 1 }}>{label}</FormLabel>
            <RadioGroup
                name={name}
                value={recruiterDetails[name] || ""}
                onChange={handleChange}
                sx={{ flexDirection: "row", gap: 1, m: 1 }}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{ m: 0 }}
                    />
                ))}
            </RadioGroup>
        </Box>
    );

    const renderCheckboxes = (name, label, options) => (
        <Box>
            <Typography variant="h6" marginBottom="20px">
                {label}
            </Typography>
            <FormGroup>
                {options.map((option) => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                name={name}
                                value={option}
                                checked={
                                    recruiterDetails.branchesEligible &&
                                    recruiterDetails.branchesEligible.includes(
                                        option
                                    )
                                }
                                onChange={handleCheckboxChange}
                            />
                        }
                        label={option}
                        sx={{ margin: 0 }}
                    />
                ))}
            </FormGroup>
        </Box>
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
                {renderTextField("homePage", "Home Page")}
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
                    {renderTextField("fax", "Fax")}
                    {renderTextField("telephoneNo", "Telephone No")}
                    {renderTextField("email", "Email ID")}
                    {renderTextField(
                        "jobDescription",
                        "Job Description",
                        true,
                        "textarea"
                    )}
                    {renderTextField("address", "Address", true, "textarea")}
                </Box>
            </Box>

            <Box
                marginTop="30px"
                border="1px solid gray"
                borderRadius="5px"
                padding="15px"
            >
                <Typography variant="h6" marginBottom="20px">
                    Eligibility Criteria
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
                    {renderTextField(
                        "tenthGradeCutoff",
                        "10th Grade / SSLC Cut off (Percentage)"
                    )}
                    {renderTextField(
                        "twelfthGradeCutoff",
                        "12th Grade / PUC Cut off (Percentage)"
                    )}
                    {renderTextField(
                        "btechCutoff",
                        "B.Tech Cut off (Percentage)"
                    )}
                    {renderTextField(
                        "maxClearedBacklogs",
                        "Max Cleared Backlogs"
                    )}
                    {renderTextField(
                        "maxNonClearedBacklogs",
                        "Max Non Cleared Backlogs"
                    )}
                    {renderCheckboxes("branchesEligible", "Branches Eligible", [
                        "Computer Science",
                        "Information Technology",
                        "Electronics and Communication",
                        "Mechanical",
                        "Civil",
                    ])}
                </Box>
            </Box>

            <Box
                marginTop="30px"
                border="1px solid gray"
                borderRadius="5px"
                padding="15px"
            >
                <Typography variant="h6" marginBottom="20px">
                    Hiring Details
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
                    {renderRadioGroup("employmentType", "Employment Type", [
                        "Full-Time",
                        "Part-Time",
                        "Internship",
                    ])}
                    {renderTextField(
                        "minSalaryPackage",
                        "Min Salary Package (in LPA)"
                    )}
                    {renderTextField("jobLocation", "Job Location")}
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
};

export default RecruiterRegister;
