import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { tokens } from "../../theme";
import CssTextField from "../../components/global/CssTextField";
import toast, { Toaster } from "react-hot-toast";

const colors = tokens();
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
                    toast.error("Error registering users: " + error.message);
                });
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log("No file selected");
            toast.error("No file selected");
            return;
        } else {
            toast.success("All users registered successfully");
        }
    };

    return (
        <Box margin="20px" width="100%">
            <Typography variant="h4">Upload Excel File</Typography>
            <Box marginTop="10px">
                <CssTextField
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{
                        accept: ".xlsx, .xls",
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        background: colors.gray[100],
                        "&:hover": { background: colors.gray[100] },
                        margin: "10px",
                    }}
                    onClick={handleSubmit}
                >
                    Upload
                </Button>
            </Box>
            <Toaster position="bottom-center" /> {/* Add the toast container */}
        </Box>
    );
};

export default UploadExcel;
