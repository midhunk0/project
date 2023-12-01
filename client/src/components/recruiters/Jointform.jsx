// Import necessary libraries and components
import React, { useState } from "react";
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

// Main component
const Jointform = () => {
    // Define the initial state for form data
    const [formData, setFormData] = useState({
        companyName: "",
        natureOfBusiness: "",
        category: "",
        homePage: "",
        contactPerson: "",
        designation: "",
        fax: "",
        telephoneNo: "",
        email: "",
        jobDescription: "",
        address: "",
        tenthGradeCutoff: "",
        twelfthGradeCutoff: "",
        btechCutoff: "",
        maxClearedBacklogs: "",
        maxNonClearedBacklogs: "",
        branchesEligible: [],
        grossSalary: "",
        bond: "",
        bondYears: "",
        recruitmentTechnique: "",
        preferredDates: "",
        onlineExam: "",
        aptitudeTest: "",
        technicalTest: "",
        groupDiscussion: "",
        technicalInterview: "",
        personalInterview: "",
        branchOrientedInterview: "",
        totalRounds: "",
        tableData: [], // Updated to include table data
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
    const handleCheckboxChange = (e, row) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedTableData = prevData.tableData.map((tableRow) => {
                if (tableRow === row) {
                    return {
                        ...tableRow,
                        isChecked: checked,
                    };
                }
                return tableRow;
            });

            return {
                ...prevData,
                tableData: updatedTableData,
            };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filter only checked rows
            const checkedRows = formData.tableData.filter((row) => row.isChecked);

            // Send data to the server
            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterRegister",
                {
                    ...formData,
                    tableData: checkedRows,
                }
            );
            toast.success("Recruiter registered successfully!");

            // Reset the form
            setFormData({
                companyName: "",
                natureOfBusiness: "",
                category: "",
                homePage: "",
                contactPerson: "",
                designation: "",
                fax: "",
                telephoneNo: "",
                email: "",
                jobDescription: "",
                address: "",
                tenthGradeCutoff: "",
                twelfthGradeCutoff: "",
                btechCutoff: "",
                maxClearedBacklogs: "",
                maxNonClearedBacklogs: "",
                branchesEligible: [],
                grossSalary: "",
                bond: "",
                bondYears: "",
                recruitmentTechnique: "",
                preferredDates: "",
                onlineExam: "",
                aptitudeTest: "",
                technicalTest: "",
                groupDiscussion: "",
                technicalInterview: "",
                personalInterview: "",
                branchOrientedInterview: "",
                totalRounds: "",
                tableData: [],
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

    // Render radio group
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
                value={formData[name]}
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

    // Render the recruitment status table

    // Render checkboxes for branches
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
                                checked={formData.branchesEligible.includes(
                                    option
                                )}
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
                {renderTextField(
                    "natureOfBusiness",
                    "Nature of Business (IT, R&D, etc)"
                )}

                {renderTextField("category", "Category ( private, gen, NGO, PSV )")}
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
                    Recruitment Details
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
                        "grossSalary",
                        "Gross Salary per Annum (INR)"
                    )}
                    {renderTextField("bond", "Bond", false)}
                    {renderTextField("bondYears", "Bond Years", false)}
                    {renderRadioGroup(
                        "recruitmentTechnique",
                        "Recruitment Technique",
                        [
                            "Online Exam",
                            "Aptitude Test",
                            "Technical Test",
                            "Group Discussion",
                            "Technical Interview",
                            "Personal Interview",
                            "Branch Oriented Interview",
                        ]
                    )}
                    {renderTextField(
                        "preferredDates",
                        "Preferred Dates for Recruitment"
                    )}
                    {renderRadioGroup("onlineExam", "Online Exam", [
                        "Yes",
                        "No",
                    ])}
                    {renderRadioGroup("aptitudeTest", "Aptitude Test", [
                        "Yes",
                        "No",
                    ])}
                    {renderRadioGroup("technicalTest", "Technical Test", [
                        "Yes",
                        "No",
                    ])}
                    {renderRadioGroup("groupDiscussion", "Group Discussion", [
                        "Yes",
                        "No",
                    ])}
                    {renderRadioGroup(
                        "technicalInterview",
                        "Technical Interview",
                        ["Yes", "No"]
                    )}
                    {renderRadioGroup(
                        "personalInterview",
                        "Personal Interview",
                        ["Yes", "No"]
                    )}
                    {renderRadioGroup(
                        "branchOrientedInterview",
                        "Branch Oriented Interview",
                        ["Yes", "No"]
                    )}
                    {renderTextField("totalRounds", "Total Rounds")}
                </Box>
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
                Send
            </Button>

            {/* Login link */}
            <Typography variant="body1" marginTop="20px" textAlign="center">
                Already registered? <Link to="/recruiter/login">Login</Link>
            </Typography>

            {/* Render the recruitment status table */}
            {/* {renderTable()} */}
        </Box>
    );
};

// Export the component
export default Jointform;


