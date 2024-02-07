import React, { useState } from "react";
import { useEffect } from "react";
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
    TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#A0AAB4",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
        },
    },
});

export const tokens = () => ({
    gray: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
    },
    primary: {
        main: "#040509", // Adjust the color value as needed
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0",
        500: "#141b2d",
        600: "#434957",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
    },
    greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
    },
    redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
    },
    blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
    },
});

export const themeSettings = () => {
    const colors = tokens();

    return {
        palette: {
            primary: {
                main: colors.primary.main,
            },
            secondary: {
                main: colors.greenAccent[500],
            },
            neutral: {
                dark: colors.gray[700],
                main: colors.gray[500],
                light: colors.gray[100],
            },
            background: {
                default: "#fcfcfc",
            },
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

const Jointform = ({ recruiter }) => {
    const id = recruiter._id;
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

    const colors = tokens();
    const [data, setData] = useState([]);

    const jafdata = useFetch(`http://localhost:8080/api/jaf/jafGet/${id}`);
    const backenddata = jafdata.data;
    console.log(backenddata);
    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkedRows = formData.tableData.filter(
                (row) => row.isChecked
            );

            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterRegister",
                {
                    ...formData,
                    tableData: checkedRows,
                }
            );
            toast.success("Job Application Form sent successfully!");

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

    const renderTextField = (name, label, required = false, type = "text") => (
        <div>
            <Typography
                variant="body2"
                color="textSecondary"
                marginBottom="5px"
            >
                {name}
            </Typography>
            <CssTextField
                name={name}
                required={required}
                label={label}
                type={type}
                value={backenddata[name]}
                onChange={handleChange}
            />
            <Checkbox
                
            />
        </div>
    );

    const renderRadioGroup = (name, label, options = []) => (
        <div>
            <Typography
                variant="body2"
                color="textSecondary"
                marginBottom="5px"
            >
                {name}
            </Typography>
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
            <Checkbox
                
            />
        </div>
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
                {renderTextField("companyName", backenddata.companyName)}
                {renderTextField(
                    "natureOfBusiness",
                    backenddata.natureOfBusiness
                )}
                {renderTextField("category", "category")}
                {renderTextField("homePage", backenddata.homePage)}
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
                    {renderTextField(
                        "contactPerson",
                        backenddata.contactPerson
                    )}
                    {renderTextField("designation", backenddata.designation)}
                    {renderTextField("fax", backenddata.fax)}
                    {renderTextField("telephoneNo", backenddata.telephoneNo)}
                    {renderTextField("email", backenddata.email)}
                    {renderTextField(
                        "jobDescription",
                        backenddata.jobDescription,
                        true,
                        "textarea"
                    )}
                    {renderTextField(
                        "address",
                        backenddata.address,
                        true,
                        "textarea"
                    )}
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
                        backenddata?.eligibilityCriteria?.tenthGradeCutoff
                    )}
                    {renderTextField(
                        "twelfthGradeCutoff",
                        backenddata.eligibilityCriteria?.twelfthGradeCutoff
                    )}
                    {renderTextField(
                        "btechCutoff",
                        backenddata?.eligibilityCriteria?.btechCutoff
                    )}
                    {renderTextField(
                        "maxClearedBacklogs",
                        backenddata?.eligibilityCriteria?.maxClearedBacklogs
                    )}
                    {renderTextField(
                        "maxNonClearedBacklogs",
                        backenddata?.eligibilityCriteria?.maxNonClearedBacklogs
                    )}
                    <Box>
                        <Typography variant="h6" marginBottom="20px">
                            Branches Eligible
                        </Typography>
                        {backenddata.branchesEligible &&
                        backenddata.branchesEligible.length > 0 ? (
                            <ul>
                                {backenddata.branchesEligible.map(
                                    (branch, index) => (
                                        <li key={index}>{branch}</li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No branches eligible data available.
                            </Typography>
                        )}
                        <Checkbox
                            
                        />
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
                        backenddata?.payPackage?.grossSalary
                    )}
                    {renderTextField(
                        "bond",
                        backenddata?.payPackage?.bond,
                        false
                    )}
                    {renderTextField(
                        "bondYears",
                        backenddata?.payPackage?.bondYears,
                        false
                    )}

                    {renderTextField(
                        "preferredDates",
                        backenddata?.recruitmentSchedule?.preferredDates
                    )}
                    {renderRadioGroup(
                        "onlineExam",
                        backenddata?.selectionProcedure?.onlineExam
                    )}
                    {renderRadioGroup(
                        "aptitudeTest",
                        backenddata?.selectionProcedure?.aptitudeTest
                    )}
                    {renderRadioGroup(
                        "technicalTest",
                        backenddata?.selectionProcedure?.technicalTest
                    )}
                    {renderRadioGroup(
                        "groupDiscussion",
                        backenddata?.selectionProcedure?.groupDiscussion
                    )}
                    {renderRadioGroup(
                        "technicalInterview",
                        backenddata?.selectionProcedure?.technicalInterview
                    )}
                    {renderRadioGroup(
                        "personalInterview",
                        backenddata?.selectionProcedure?.personalInterview
                    )}
                    {renderRadioGroup(
                        "branchOrientedInterview",
                        backenddata?.selectionProcedure?.branchOrientedInterview
                    )}
                    {renderTextField(
                        "totalRounds",
                        backenddata?.selectionProcedure?.totalRounds
                    )}
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
        </Box>
    );
};

export default Jointform;
