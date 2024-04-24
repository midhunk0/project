// import { Box, Button, Typography, styled, Grid } from "@mui/material";
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { tokens } from "../../theme";
// import CssTextField from "../../components/global/CssTextField";
// import toast, { Toaster } from "react-hot-toast";

// const UploadExcel = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       const jsonData = XLSX.utils.sheet_to_json(
//         workbook.Sheets[workbook.SheetNames[0]]
//       );
//       console.log(jsonData);

//       // Send each user from the jsonData array to the server for registration
//       const requests = jsonData.map((user) =>
//         fetch("http://localhost:8080/api/students/studentRegister", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(user),
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             console.log(data);
//             // Handle the response from the server
//           })
//           .catch((error) => {
//             console.log(error);
//             // Handle any errors
//           })
//       );

//       console.log(requests);

//       Promise.all(requests)
//         .then(() => {
//           console.log("All users registered successfully");
//         })
//         .catch((error) => {
//           toast.error("Error registering users: " + error.message);
//         });
//     };

//     reader.readAsArrayBuffer(selectedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       console.log("No file selected");
//       toast.error("No file selected");
//       return;
//     } else {
//       toast.success("All users registered successfully");
//     }
//   };

//   return (
//     <Grid container spacing={3} justifyContent="center" margin="20px">
//       <Grid item xs={10} sm={5} md={4}>
//         <Box
//           boxShadow={3}
//           padding="20px"
//           border="1px solid gray"
//           borderRadius="5px"
//           bgcolor="white"
//         >
//           <img
//             src="../../assets/excel2.png"
//             alt="Company_image"
//             style={{
//               width: "100%",
//               height: "270px",
//               objectFit: "cover",
//               borderRadius: "5px",
//             }}
//           />
//           <Typography variant="h4" margin="20px">
//             Upload Excel File
//           </Typography>
//           <CssTextField
//             type="file"
//             onChange={handleFileChange}
//             inputProps={{
//               accept: ".xlsx, .xls",
//             }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={{
//               bgcolor: "#4CAF50", // Green color
//               "&:hover": {
//                 bgcolor: "#388E3C", // Darker green color on hover
//               },
//               margin: "10px",
//             }}
//           >
//             Upload Students
//           </Button>
//         </Box>
//         <Toaster position="bottom-center" />
//       </Grid>
//     </Grid>
//   );
// };

// export default UploadExcel;

import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import CssTextField from "../../components/global/CssTextField";
import toast, { Toaster } from "react-hot-toast";

const UploadExcel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e, apiEndpoint) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      // Send each user from the jsonData array to the server for registration
      const requests = jsonData.map((user) =>
        fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            // Handle the response from the server
          })
          .catch((error) => {
            console.log(error);
            // Handle any errors
          })
      );

      Promise.all(requests)
        .then(() => {
          toast.success("All users registered successfully");
        })
        .catch((error) => {
          toast.error("Error registering users: " + error.message);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Grid container spacing={3} justifyContent="center" margin="20px">
      <Grid item xs={10} sm={5} md={4}>
        <Box
          boxShadow={3}
          padding="20px"
          border="1px solid gray"
          borderRadius="5px"
          bgcolor="white"
        >
          <img
             src="../../assets/excel2.png"
             alt="Company_image"
             style={{
               width: "100%",
               height: "270px",
               objectFit: "cover",
               borderRadius: "5px",
             }}
           />
          <Typography variant="h4" margin="20px">
            Upload Excel File
          </Typography>
          <CssTextField
            type="file"
            onChange={handleFileChange}
            inputProps={{
              accept: ".xlsx, .xls",
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e, "http://localhost:8080/api/students/studentRegister")}
            sx={{
              bgcolor: "#4CAF50", // Green color
              "&:hover": {
                bgcolor: "#388E3C", // Darker green color on hover
              },
              margin: "10px",
            }}
          >
            Upload Students
          </Button>
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e, "http://localhost:8080/api/faculty/facultyRegister")}
            sx={{
              bgcolor: "#1976D2", // Blue color
              "&:hover": {
                bgcolor: "#0D47A1", // Darker blue color on hover
              },
              margin: "10px",
            }}
          >
            Upload Faculty
          </Button>
        </Box>
        <Toaster position="bottom-center" />
      </Grid>
    </Grid>
  );
};

export default UploadExcel;


