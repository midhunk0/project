import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Table } from "react-bootstrap";
import axios from "axios";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/students/get-all-students"
                );
                setStudents(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <Box display="column" margin="10px">
            <Typography variant="h4" marginBottom="10px">
                Student Details
            </Typography>
            <Box
                sx={{
                    "& .MuiTablePagination-selectLabel": {
                        marginTop: "10px",
                    },
                    "& .MuiTablePagination-displayedRows": {
                        marginTop: "10px",
                    },
                }}
            >
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>College ID</th>
                                <th>Email</th>
                                <th>Current CGPA</th>
                                <th>Deapartment</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {students
                                .filter(
                                    (student) => student.studentCollegeID !== "admin123"
                                )
                                .map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.username}</td>
                                        <td>{student.studentCollegeID}</td>
                                        <td>{student.email}</td>
                                        <td>{student.cgpa}</td>
                                        <td>{student.department}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
            </Box>
        </Box>
    );
};

export default Student;
