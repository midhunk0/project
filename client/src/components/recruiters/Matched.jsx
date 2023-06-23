import React from "react";
import { Box, Typography } from "@mui/material";
import { Table } from "react-bootstrap";

const students = [
  { id: 1, name: "midhun", collegeId: "tve20cs069", currentSem: 6, currentCgpa: 7.9, role: "data analyst" },
  { id: 2, name: "aswin", collegeId: "tve20cs020", currentSem: 6, currentCgpa: 8.4, role: "sde" },
  { id: 3, name: "akshay", collegeId: "tve20cs012", currentSem: 6, currentCgpa: 8.5, role: "ML/AI" },
  { id: 4, name: "manjunath", collegeId: "tve20cs064", currentSem: 6, currentCgpa: 9.1, role: "sde" },
];

const Matched = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box margin="10px" width="100%">
        <Typography variant="h4" marginBottom="10px">Matched Students</Typography>
        <Box sx={{ overflowX: "auto", maxHeight: "500px" }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>College ID</th>
                <th>Current CGPA</th>
                <th>Current Semester</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {students.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.collegeId}</td>
                  <td>{row.currentCgpa}</td>
                  <td>{row.currentSem}</td>
                  <td>{row.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default Matched;
