// import React, { useState, useEffect } from "react";
// import { Box, Button, Typography, Snackbar, Grid } from "@mui/material";
// import axios from "axios";
// import useFetch from "../../hooks/useFetch";
// import { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import CssTextField from "../global/CssTextField";

// const RecruiterHome = () => {
//   const [password, setPassword] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(true);
//   const [flag, setFlag] = useState(false);
//   const [passwordUpdated, setPasswordUpdated] = useState(false);
//   const { user } = useContext(AuthContext);
//   const id = user._id;

//   const dataRecruiter = useFetch(
//     `https://project-api-iwiy.onrender.com/api/recruiters/recruiterProfile/${id}`
//   );
//   const recruiter = dataRecruiter.data;

//   useEffect(() => {
//     if (recruiter && recruiter.password === "") {
//       setFlag(true);
//     }
//   }, [recruiter]);

//   const handleChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://project-api-iwiy.onrender.com/api/recruiters/recruiterPassword/${id}`,
//         { newPassword: password }
//       );
//       setSnackbarOpen(true);
//       setPassword("");
//       setFlag(false);
//       setPasswordUpdated(true);
//     } catch (err) {
//       console.log(err.response);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(true);
//   };

//   return flag ? (
//     <Box
//       height="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//     >
//       {/* Update Password Form */}
//       <Box
//         bgcolor="white"
//         padding="20px 60px"
//         borderRadius="10px"
//         display="flex"
//         alignItems="center"
//         flexDirection="column"
//         gap="10px"
//       >
//         <Typography variant="h5" marginTop="10px" marginBottom="30px">
//           Update Password
//         </Typography>
//         <CssTextField
//           required
//           id="password"
//           type="password"
//           value={password}
//           onChange={handleChange}
//           label="New Password"
//           disabled={passwordUpdated}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={passwordUpdated}
//         >
//           Update
//         </Button>
//       </Box>
//       {/* Snackbar for password update confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         message="Password updated successfully"
//       />
//     </Box>
//   ) : (
//     // Company Details Presentation
//     <Grid container spacing={3} justifyContent="center" mt="50px">
//       <Grid item xs={12} sm={6} md={4}>
//         <Box boxShadow={3} borderRadius={5} padding={3} bgcolor="white">
//           <img
//             src="../../assets/company_image.jpg"
//             alt="Company_image"
//             style={{
//               width: "100%",
//               height: "200px",
//               objectFit: "cover",
//               borderRadius: "5px",
//             }}
//           />
//           <Typography variant="h3" style={{ marginTop: "25px" }}>
//             {user.companyName}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.email}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.natureOfBuisiness}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.contactPerson}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.designation}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.phoneNo}
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {user.address}
//           </Typography>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default RecruiterHome;





import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Grid } from "@mui/material";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CssTextField from "../global/CssTextField";

const RecruiterHome = () => {
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [flag, setFlag] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const { user } = useContext(AuthContext);
  const id = user._id;

  const dataRecruiter = useFetch(
    `https://project-api-iwiy.onrender.com/api/recruiters/recruiterProfile/${id}`
  );
  const recruiter = dataRecruiter.data;

  useEffect(() => {
    if (recruiter && recruiter.password === "") {
      setFlag(true);
    }
  }, [recruiter]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://project-api-iwiy.onrender.com/api/recruiters/recruiterPassword/${id}`,
        { newPassword: password }
      );
      setSnackbarOpen(true);
      setPassword("");
      setFlag(false);
      setPasswordUpdated(true);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(true);
  };

  return flag ? (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Update Password Form */}
      <Box
        bgcolor="white"
        padding="20px 60px"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="10px"
        maxWidth="500px" /* Adjust the max width as needed */
        width="100%" /* Ensures form takes full width on small screens */
      >
        <Typography variant="h5" marginTop="10px" marginBottom="30px">
          Update Password
        </Typography>
        <CssTextField
          required
          id="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="New Password"
          disabled={passwordUpdated}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={passwordUpdated}
        >
          Update
        </Button>
      </Box>
      {/* Snackbar for password update confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Password updated successfully"
      />
    </Box>
  ) : (
    // Company Details Presentation
    <Grid container spacing={3} justifyContent="center" mt="50px">
      <Grid item xs={12} sm={6} md={4}>
        <Box boxShadow={3} borderRadius={5} padding={3} bgcolor="white" maxWidth="500px">
          <img
            src="../../assets/company_image.jpg"
            alt="Company_image"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <Typography variant="h3" style={{ marginTop: "25px" }}>
            {user.companyName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.natureOfBuisiness}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.contactPerson}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.designation}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.phoneNo}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.address}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RecruiterHome;
