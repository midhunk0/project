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
        tableData: [
            {
                label: "Computer Science",
                value: "Computer Science",
                isChecked: false,
            },
            {
                label: "Electronics and Communication",
                value: "Electronics and Communication",
                isChecked: false,
            },
            { label: "Mechanical", value: "Mechanical", isChecked: false },
            { label: "Civil", value: "Civil", isChecked: false },
            {
                label: "Electrical and Electronics",
                value: "Electrical and Electronics",
                isChecked: false,
            },
        ],
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
    const handleCheckboxChange = (e, rowIndex) => {
        const { checked } = e.target;
        setFormData((prevData) => {
            const updatedTableData = prevData.tableData.map(
                (tableRow, index) => {
                    if (index === rowIndex) {
                        return {
                            ...tableRow,
                            isChecked: checked,
                        };
                    }
                    return tableRow;
                }
            );

            return {
                ...prevData,
                tableData: updatedTableData,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filter only checked rows
            const checkedRows = formData.tableData.filter(
                (row) => row.isChecked
            );
            // Send data to the server
            const res = await axios.post(
                "http://localhost:8080/api/jaf/jafPost",
                {
                    ...formData,
                    tableData: checkedRows,
                }
            );
            toast.success("Job Application Form sent successfully!");
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
                tableData: [
                    {
                        label: "Computer Science",
                        value: "Computer Science",
                        isChecked: false,
                    },
                    {
                        label: "Electronics and Communication",
                        value: "Electronics and Communication",
                        isChecked: false,
                    },
                    {
                        label: "Mechanical",
                        value: "Mechanical",
                        isChecked: false,
                    },
                    { label: "Civil", value: "Civil", isChecked: false },
                    {
                        label: "Electrical and Electronics",
                        value: "Electrical and Electronics",
                        isChecked: false,
                    },
                ],
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

    // Render checkboxes for the table
    const renderTableCheckboxes = () => (
        <FormGroup>
            {formData.tableData.map((row, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            value={row.value}
                            checked={row.isChecked || false}
                            onChange={(e) => handleCheckboxChange(e, index)}
                        />
                    }
                    label={row.label}
                    sx={{ margin: 0 }}
                />
            ))}
        </FormGroup>
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
                Job Application Form
            </Typography>

            {/* Text input fields */}
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
                {renderTextField(
                    "category",
                    "Category ( private, gen, NGO, PSV )"
                )}
                {renderTextField("homePage", "Home Page")}
            </Box>

            {/* Contact Information */}
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

            {/* Eligibility Criteria */}
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
                    <Box>
                        <Typography variant="h6" marginBottom="20px">
                            Branches Eligible
                        </Typography>
                        {renderTableCheckboxes()}
                    </Box>
                </Box>
            </Box>

            {/* Recruitment Details */}
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

            {/* ... (other components) */}
        </Box>
    );
};

// Export the component
export default Jointform;
