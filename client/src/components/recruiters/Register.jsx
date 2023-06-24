import React from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import CssTextField from "../global/CssTextField";

const RecruiterRegister = () => {
    const colors = tokens();
 
    const renderTextField = (label, required = true, type = "text") => (
        <CssTextField required={required} label={label} type={type} />
    );

    const renderRadioGroup = (label, options) => (
        <Box display="flex" justifyContent="space-between" gap="20px" style={{alignItems:"center"}}>
            <FormLabel sx={{m:1}}>{label}</FormLabel>
            <RadioGroup name={label.toLowerCase()} sx={{ flexDirection: "row", gap:1, m:1 }}>
                {options.map((option) => (
                    <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} sx={{m:0}}/>
                ))}
            </RadioGroup>
        </Box>
    );

    const handleSubmit=()=>{

    }

    const renderCheckboxes = (label, options) => (
        <Box>
            <Typography variant="h6" marginBottom="20px">
                {label}
            </Typography>
            <FormGroup>
                {options.map((option) => (
                    <FormControlLabel key={option} control={<Checkbox />} label={option} sx={{margin:0}}/>
                ))}
            </FormGroup>
        </Box>
    );

    return (
        <Box padding="20px 60px" display="flex" flexDirection="column" gap="20px" margin="20px" border="1px solid gray" borderRadius="5px" sx={{boxShadow:"1px 2px 9px gray"}} >
            <Typography variant="h4" marginBottom="20px">
                Register
            </Typography>

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="20px" >
                {renderTextField("Company Name")}
                {renderTextField("Nature of Business (IT, R&D, etc)")}
                {renderTextField("Home Page")}
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                <Typography variant="h6" marginBottom="20px">
                    Contact Information
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="20px">
                    {renderTextField("Contact Person")}
                    {renderTextField("Designation")}
                    {renderTextField("Fax")}
                    {renderTextField("Telephone No")}
                    {renderTextField("Email ID")}
                    {renderTextField("Job Description", true, "textarea")}
                    {renderTextField("Address", true, "textarea")}
                </Box>
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                <Typography variant="h6" marginBottom="20px">
                    Eligibility Criteria
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="20px">
                    {renderTextField("10th Grade / SSLC Cut off (Percentage)")}
                    {renderTextField("12th Grade Cut off (Percentage)")}
                    {renderTextField("B Tech Cut off (Percentage)")}
                    {renderTextField("Maximum Cleared Backlogs")}
                    {renderTextField("Maximum Non-Cleared Backlogs")}
                </Box>
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                {renderCheckboxes("Branches Eligible for Placement", [
                    "B.Tech, Civil Engineering",
                    "B.Tech, Architecture",
                    "B.Tech, Mechanical Engineering",
                    "B.Tech, Industrial Engineering",
                    "B.Tech, Electrical Engineering",
                    "B.Tech, Electronics & Communication",
                    "B.Tech, Applied Electronics & Insrtumentation",
                    "B.Tech, Computer Science & Engineering",
                    "M.Tech",
                    "MCA",
                    "MBA",
                ])}
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                <Typography variant="h6" marginBottom="20px">
                    Pay Package
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr 1fr" }} gap="20px">
                    {renderTextField("Gross Salary")}
                    {renderRadioGroup("Bond", ["Yes", "No"])}
                    {renderTextField("No of Years (if Yes)")}
                </Box>
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                <Typography variant="h6" marginBottom="20px">
                    Proposed Campus Recruitment Schedule
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }} gap="20px">
                    {renderRadioGroup("Recruitment Technique", ["On Campus", "Off Campus"])}
                    {renderTextField("Preferred Dates", true)}
                </Box>
            </Box>

            <Box marginTop="30px" border="1px solid gray" borderRadius="5px" padding="15px">
                <Typography variant="h6" marginBottom="20px">
                    Selection Procedure Schedule
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }} gap="20px">
                    {renderRadioGroup("Online Exam", ["Yes", "No"])}
                    {renderRadioGroup("Aptitude Test", ["Yes", "No"])}
                    {renderRadioGroup("Technical Test", ["Yes", "No"])}
                    {renderRadioGroup("Group Discussion", ["Yes", "No"])}
                    {renderRadioGroup("Technical Interview", ["Yes", "No"])}
                    {renderRadioGroup("Personal Interview", ["Yes", "No"])}
                    {renderRadioGroup("Branch Oriented Interview", ["Yes", "No"])}
                    {renderTextField("Total number of rounds")}
                </Box>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }} gap="20px" sx={{margin:"40px 0 40px 0"}}>
                <Button onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        background: colors.gray[100],
                        // width: "25%",
                        "&:hover": { background: colors.gray[100] },
                    }}
                >
                    Sign Up
                </Button>
                <Typography variant="h6">
                    Already have an account?{" "}
                    <Link to="/recruiter/login" style={{ textDecoration: "none" }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default RecruiterRegister;




// import React from "react";
// import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { tokens } from "../../theme";
// import CssTextField from "../global/CssTextField";

// const RecruiterRegister = () => {
//   const colors = tokens();
//   const [formData, setFormData] = React.useState({});

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const renderTextField = (label, required = true, type = "text", name) => (
//     <CssTextField
//       required={required}
//       label={label}
//       type={type}
//       name={name}
//       value={formData[name] || ""}
//       onChange={handleChange}
//     />
//   );

//   const renderRadioGroup = (label, options) => (
//     <Box display="flex" justifyContent="space-between" gap="20px" style={{ alignItems: "center" }}>
//       <FormLabel sx={{ m: 1 }}>{label}</FormLabel>
//       <RadioGroup name={label.toLowerCase()} sx={{ flexDirection: "row", gap: 1, m: 1 }}>
//         {options.map((option) => (
//           <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} sx={{ m: 0 }} />
//         ))}
//       </RadioGroup>
//     </Box>
//   );

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData); // Replace this with your actual database post logic
//   };

//   const renderCheckboxes = (label, options) => (
//     <Box>
//       <Typography variant="h6" marginBottom="20px">
//         {label}
//       </Typography>
//       <FormGroup>
//         {options.map((option) => (
//           <FormControlLabel key={option} control={<Checkbox />} label={option} sx={{ margin: 0 }} />
//         ))}
//       </FormGroup>
//     </Box>
//   );

//   return (
//     <Box padding="20px 60px" display="flex" flexDirection="column" gap="20px" margin="20px" border="1px solid gray" borderRadius="5px" sx={{ boxShadow: "1px 2px 9px gray" }} >
//       <Typography variant="h4" marginBottom="20px">
//         Register
//       </Typography>

//       <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="20px" >
//         {renderTextField("Company Name", true, "text", "companyName")}
//         {renderTextField("Nature of Business (IT, R&D, etc)", true, "text", "natureOfBusiness")}
//         {renderTextField("Home Page", true, "text", "homePage")}
//       </Box>

//       {/* Rest of the code remains the same */}
//       // ...

//       <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }} gap="20px" sx={{ margin: "40px 0 40px 0" }}>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           sx={{
//             background: colors.gray[100],
//             // width: "25%",
//             "&:hover": { background: colors.gray[100] },
//           }}
//         >
//           Sign Up
//         </Button>
//         <Typography variant="h6">
//           Already have an account?{" "}
//           <Link to="/recruiter/login" style={{ textDecoration: "none" }}>
//             Login
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default RecruiterRegister;
