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

const JafForm = ({ recruiter }) => {
    const id = recruiter._id;
    const [formData, setFormData] = useState({});
   

    const jafdata = useFetch(`http://localhost:8080/api/jaf/jafGet/${id}`);
    const backenddata = jafdata.data || {}; // Ensure backenddata is defined

    const jafid = backenddata._id;

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
            const res = await axios.put(`http://localhost:8080/api/jaf/jafPut/${jafid}`, { name, checked });
            console.log(res.data); // Log the response data if needed
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/recruiters/recruiterRegister",
                formData
            );
            toast.success("Job Application Form sent successfully!");
            setFormData({});
        } catch (err) {
            console.log(err.response);
            toast.error("Registration failed!");
        }
    };

    const renderTextField = (name, value) => (
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
                label={name}
                type="text"
                value={backenddata[name]?.value || ''} // Null check
                onChange={handleChange}
            />
            <Checkbox
                value={name}
                onChange={(e) => handleCheckboxChange(e)} />
        </div>
    );

    // RenderRadioGroup and other functions remain unchanged

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
                {renderTextField("companyName", backenddata?.companyName)}
                {renderTextField("natureOfBusiness", backenddata?.natureOfBusiness)}
                {renderTextField("category", backenddata?.category)}
                {renderTextField("homePage", backenddata?.homePage)}
            </Box>

            {/* Contact Information */}
            {/* Contact Information and other sections remain unchanged */}

            {/* Submit button */}
            <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                sx={{
                    marginTop: "30px",
                    
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default JafForm;
