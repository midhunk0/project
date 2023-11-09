/* eslint-disable no-unused-vars */
// @ts-nocheck
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

const RecruiterRegister = () => {
    const colors = tokens();

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
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
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

    // const [selectedCategory, setSelectedCategory] = useState('');

    // const categoryOptions = ['Private', 'General', 'NGO', 'PSV'];

    // const handleCategoryChange = (e) => {
    //     setSelectedCategory(e.target.value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterRegister",
                formData
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
            });
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
            value={formData[name]}
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

    const renderTable = () => (
        <Box marginTop="30px">


<style>
                {`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                
                th {
                    background-color: #f2f2f2;
                }
                
                /* Style for the checkbox in the table */
                table input[type="checkbox"] {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
                
                /* Style for the checked checkbox */
                table input[type="checkbox"]:checked {
                    background-color: #4caf50;
                    border: 1px solid #4caf50;
                    color: white;
                }
                
                /* Style for the disabled checkbox (No status) */
                table input[type="checkbox"]:disabled {
                    background-color: #ddd;
                    cursor: not-allowed;
                }
                `}
            </style>


            
            <Typography variant="h6" marginBottom="20px">
                Recruitment Status Table
            </Typography>
            <table>
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Dept</th>
                        <th>Programme</th>
                        <th>Code</th>
                        <th>Yes/No</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Replace the sample data with your actual data */}
                    <tr>
                        <td>1</td>
                        <td>Applied Electronics</td>
                        <td>B.Tech</td>
                        <td>AE</td>
                        <td>
                            <Checkbox onChange={handleCheckboxChange} />
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </Box>
    )

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

            <Typography variant="body1" marginTop="20px" textAlign="center">
                Already registered? <Link to="/recruiter/login">Login</Link>
            </Typography>

            {renderTable()}
        </Box>
    );
};

export default RecruiterRegister;
