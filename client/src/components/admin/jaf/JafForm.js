import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
} from "@mui/material";
import Datetime from "react-datetime";
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

const customStyles = {
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #6F7E8C",
    color: "#333",
    fontSize: "14px",
    lineHeight: "1.5",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  calendarContainer: {
    borderRadius: "5px",
    border: "1px solid #6F7E8C",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    zIndex: "9999",
  },
};

const JafForm = ({ recruiter }) => {
  const id = recruiter._id;

  const jafdata = useFetch(
    `https://project-api-iwiy.onrender.com/api/jaf/jafGet/${id}`
  );
  const backenddata = jafdata.data || {}; // Ensure backenddata is defined
  console.log(backenddata);

  const jafid = backenddata._id;
  const [formData, setFormData] = useState({
    nb: "",
    applicationDeadline: backenddata.applicationDeadline || new Date(), // Use existing value or default to current date/time
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    const name = e.target.value;
    console.log(name, checked);

    try {
      const res = await axios.put(
        `https://project-api-iwiy.onrender.com/api/jaf/jafPut/${jafid}`,
        { name, checked }
      );
      console.log(res.data); // Log the response data if needed
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const utcDate = new Date(selectedDate);
      const utcDateString = utcDate.toISOString(); // Convert to UTC string format

      const updatedData = {
        nb: { value: formData.nb, check: true },
        applicationDeadline: { value: utcDateString, check: true },
        // Include other fields as needed
      };

      await axios.put(
        `https://project-api-iwiy.onrender.com/api/jaf/jafAdminSent/${jafid}`,
        true
      );
      await axios.post(
        "https://project-api-iwiy.onrender.com/api/jaf/send-email-to-students"
      );
      // Send the new NB value to the server
      const res = await axios.put(
        `https://project-api-iwiy.onrender.com/api/jaf/jafPutNbDeadline/${jafid}`,
        updatedData
      );

      console.log(res.data);
      toast.success("Notification sent successfully!");
      setFormData({});
    } catch (err) {
      console.log(err.response);
      toast.error("Registration failed!");
    }
  };

  const renderTextField = (name, label) => (
    <div>
      <Typography variant="body2" color="textSecondary" marginBottom="5px">
        {/* {label} */}
      </Typography>
      <CssTextField
        name={name}
        label={label}
        type="text"
        value={
          backenddata[name]?.value !== undefined
            ? backenddata[name].value.toString()
            : ""
        } // Check for undefined and convert to string
        onChange={handleChange}
      />

      <Checkbox value={name} onChange={(e) => handleCheckboxChange(e)} />
    </div>
  );

  const renderTextFieldNb = (name, label, required = true, type = "text") => (
    <div>
      <CssTextField
        name={name}
        required={required}
        label={label}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        sx={{ width: "100%", marginBottom: "10px" }}
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
        Job Announcement Form
      </Typography>

      {/* Company Information */}
      <Box
        marginTop="30px"
        border="1px solid gray"
        borderRadius="5px"
        padding="15px"
      >
        <Typography variant="h6" marginBottom="20px">
          Company Information
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
          {renderTextField("natureOfBusiness", "Nature of Business")}
          {renderTextField("category", "Category")}
          {renderTextField("homePage", "Home Page")}
        </Box>
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
          {renderTextField("jobDescription", "Job Description")}
          {renderTextField("address", "Address")}
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
            <Typography variant="h6" marginBottom="10px">
              Branches Eligible{" "}
              <Checkbox
                value="branchesEligible"
                onChange={(e) => handleCheckboxChange(e)}
              />
            </Typography>
            <Box display="flex" flexDirection="column">
              {backenddata?.branchesEligible?.values?.map((branch, index) => (
                <Typography key={index}>
                  <b>{branch}</b>
                </Typography>
              ))}
            </Box>
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
          marginBottom="20px"
        >
          {renderTextField("grossSalary", "Gross Salary per Annum (INR)")}
          {renderTextField("bond", "Bond")}
          {renderTextField("bondYears", "Bond Years")}
          {renderTextField("preferredDates", "Preferred Dates for Recruitment")}
          {renderTextField(
            "recruitmentTechnique",
            "Recruitment Technique(OnCampus/OffCampus)"
          )}
          {renderTextField("totalRounds", "Total Rounds")}
          <Box>
            <Typography variant="h6" marginBottom="10px">
              Recruitment Process{" "}
              <Checkbox
                value="recruitmentProcess"
                onChange={(e) => handleCheckboxChange(e)}
              />
            </Typography>

            <Box display="flex" flexDirection="column">
              {backenddata?.recruitmentProcess?.values?.map((branch, index) => (
                <Typography key={index}>
                  <b>{branch}</b>
                </Typography>
              ))}
            </Box>
            <Box></Box>
          </Box>
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
          <Typography variant="h6">Select Deadline:</Typography>

          <Datetime
            label="Application Deadline"
            value={selectedDate}
            onChange={handleDateChange}
            inputProps={{ style: customStyles.input }} // Change InputProps to inputProps
            renderInput={(params) => (
              <input
                {...params}
                style={customStyles.input} // Apply custom styles directly to the input element
              />
            )}
            renderCalendar={(props, openCalendar) => (
              <Box style={customStyles.calendarContainer}>
                <div onClick={openCalendar}>{props.value}</div>
              </Box>
            )}
          />
        </Box>
      </Box>
      <Box
        marginTop="30px"
        border="1px solid gray"
        borderRadius="5px"
        padding="15px"
      >
        <Typography variant="h6" marginBottom="20px">
          Note:
        </Typography>
        {renderTextFieldNb("nb", "NB:")}
      </Box>

      {/* Submit button */}
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
        sx={{
          marginTop: "30px",
        }}
      >
        Send to Students
      </Button>
    </Box>
  );
};

export default JafForm;
