// @ts-nocheck
// Recruiter viewed JAF form

import React, { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { baseUrl } from "../../Url";

// Main component
const Jointform = () => {
  // Define the initial state for form data
  const userdata = JSON.parse(localStorage.getItem("user"));
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
    recruiter_id: userdata._id,
    grossSalary: "",
    bond: "",
    bondYears: "",
    recruitmentTechnique: "",
    preferredDates: "",
    totalRounds: "",
    nb: "",
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
      {
        label: "Applied Electronics & Instrumentation",
        value: "Applied Electronics & Instrumentation",
        isChecked: false,
      },
      {
        label: "Industrial",
        value: "Industrial",
        isChecked: false,
      },
    ],
    recruitmentProcess: [
      { label: "Online Test", value: "Online Test", isChecked: false },
      { label: "Aptitude Test", value: "Aptitude Test", isChecked: false },
      { label: "Technical Test", value: "Technical Test", isChecked: false },
      {
        label: "Group Discussion",
        value: "Group Discussion",
        isChecked: false,
      },
      {
        label: "Technical Interview",
        value: "Technical Interview",
        isChecked: false,
      },
      {
        label: "Personal Interview",
        value: "Personal Interview",
        isChecked: false,
      },
      {
        label: "Branch Oriented Interview",
        value: "Branch Oriented Interview",
        isChecked: false,
      },
    ],
  });

  // Define the colors variable using the tokens function
  const colors = tokens(); // Make sure you have a theme file with a tokens function

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === prevData[name] ? "" : value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle checkbox changes for Branches Eligible
  const handleBranchesEligibleChange = (e, rowIndex) => {
    const { checked } = e.target;
    setFormData((prevData) => {
      const updatedTableData = prevData.tableData.map((tableRow, index) => {
        if (index === rowIndex) {
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

  // Handle checkbox changes for Recruitment Process
  const handleRecruitmentProcessChange = (e, rowIndex) => {
    const { checked } = e.target;
    setFormData((prevData) => {
      const updatedRecruitmentProcess = prevData.recruitmentProcess.map(
        (process, index) => {
          if (index === rowIndex) {
            return {
              ...process,
              isChecked: checked,
            };
          }
          return process;
        }
      );

      return {
        ...prevData,
        recruitmentProcess: updatedRecruitmentProcess,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter only checked branches eligible
      const checkedBranchesEligible = formData.tableData.filter(
        (row) => row.isChecked
      );
      const checkedRecruitmentProcess = formData.recruitmentProcess.filter(
        (process) => process.isChecked
      );

      // Send data to the server
      console.log(formData)
      const res = await axios.post(`http://${baseUrl}/api/jaf/jafPost`, {
        ...formData,
        tableData: checkedBranchesEligible, // Update with checked branches eligible
        recruitmentProcess: checkedRecruitmentProcess,
      });

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
        nb: "",
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
          {
            label: "Applied Electronics & Instrumentation",
            value: "Applied Electronics & Instrumentation",
            isChecked: false,
          },
          {
            label: "Industrial",
            value: "Industrial",
            isChecked: false,
          },
        ],
        recruitmentProcess: [
          { label: "Online Test", value: "Online Test", isChecked: false },
          { label: "Aptitude Test", value: "Aptitude Test", isChecked: false },
          {
            label: "Technical Test",
            value: "Technical Test",
            isChecked: false,
          },
          {
            label: "Group Discussion",
            value: "Group Discussion",
            isChecked: false,
          },
          {
            label: "Technical Interview",
            value: "Technical Interview",
            isChecked: false,
          },
          {
            label: "Personal Interview",
            value: "Personal Interview",
            isChecked: false,
          },
          {
            label: "Branch Oriented Interview",
            value: "Branch Oriented Interview",
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
  const renderBranchesEligibleCheckboxes = () => (
    <FormGroup>
      {formData.tableData.map((row, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={row.value}
              checked={row.isChecked || false}
              onChange={(e) => handleBranchesEligibleChange(e, index)}
            />
          }
          label={row.label}
          sx={{ margin: 0 }}
        />
      ))}
    </FormGroup>
  );

  const renderRecruitmentProcessCheckboxes = () => (
    <FormGroup>
      {formData.recruitmentProcess.map((process, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={process.value}
              checked={process.isChecked || false}
              onChange={(e) => handleRecruitmentProcessChange(e, index)}
            />
          }
          label={process.label}
          sx={{ margin: 0 }}
        />
      ))}
    </FormGroup>
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
        Job Announcement Form
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
        {renderTextField("category", "Category ( private, gen, NGO, PSV )")}
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
          {renderTextField("btechCutoff", "B.Tech Cut off (Percentage)")}
          {renderTextField("maxClearedBacklogs", "Max Cleared Backlogs")}
          {renderTextField("maxNonClearedBacklogs", "Max Non Cleared Backlogs")}
          <Box>
            <Typography variant="h6" marginBottom="20px">
              Branches Eligible
            </Typography>
            {renderBranchesEligibleCheckboxes()}
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
          {renderTextField("grossSalary", "Gross Salary per Annum (INR)")}
          {renderTextField("bond", "Bond(Yes/No)", false)}
          {renderTextField("bondYears", "Bond Years", false)}

          {renderTextField("preferredDates", "Preferred Dates for Recruitment")}
          {renderTextField(
            "recruitmentTechnique",
            "Recruitment Technique(Online/Offline)"
          )}
          {renderTextField("totalRounds", "Total Rounds")}
          <Box>
            <Typography variant="h6" marginBottom="20px">
              Recruitment Process
            </Typography>
            {renderRecruitmentProcessCheckboxes()}
          </Box>
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
        Send to Admin
      </Button>

      {/* ... (other components) */}
    </Box>
  );
};

// Export the component
export default Jointform;
