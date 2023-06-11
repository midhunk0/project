import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { tokens } from "../../theme";
import CssTextField from "../../components/global/CssTextField";

const colors=tokens();
const UploadExcel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();

        reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
        );
        console.log(jsonData);

        // Send each user from the jsonData array to the server for registration
        const requests = jsonData.map((user) =>
            fetch("http://localhost:8080/api/students/studentRegister", {
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
            console.log("All users registered successfully");
            })
            .catch((error) => {
            console.log("Error registering users:", error);
            });
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
        console.log("No file selected");
        return;
        }
    };

    return (
        <Box margin="20px" width="100%">
            <Typography variant="h4">Upload Excel File</Typography>
                {/* <form onSubmit={handleSubmit} style={{margin:"10px"}}>
                    <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
                    <button type="submit">Upload</button>
                </form> */}
            <Box marginTop="10px">
                <CssTextField
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{
                        accept: '.xlsx, .xls',
                    }}
                />
                <Button
                    variant="contained"
                    sx={{background:colors.gray[100],'&:hover':{background:colors.gray[100]}, margin:"10px"}}
                    onSubmit={handleSubmit}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
};

export default UploadExcel;