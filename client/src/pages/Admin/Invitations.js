import React, { useState } from "react";
import * as XLSX from "xlsx";

const UploadExcel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log("No file selected");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
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

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h1>Upload Excel File</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadExcel;
