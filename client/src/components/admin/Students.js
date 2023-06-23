import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Table } from 'react-bootstrap';

const rows = [
    { id: 1, name: "midhun", collegeId: "tve20cs069", currentSem: 6, currentCgpa: 7.9 },
    { id: 2, name: "aswin", collegeId: "tve20cs020", currentSem: 6, currentCgpa: 8.4 },
    { id: 3, name: "akshay", collegeId: "tve20cs012", currentSem: 6, currentCgpa: 8.5 },
    { id: 4, name: "manjunath", collegeId: "tve20cs064", currentSem: 6, currentCgpa: 9.1 },
];

const Student=()=> {
    return (
        <Box display="column" margin="10px">
            <Typography variant="h4" marginBottom="10px">Student Details</Typography>
            <Box
                sx={{
                    '& .MuiTablePagination-selectLabel': {
                        marginTop: '10px',
                    },
                    '& .MuiTablePagination-displayedRows': {
                        marginTop: '10px',
                    },
                }}
            >
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>College ID</th>
                    <th>Current CGPA</th>
                    <th>Current Semester</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.collegeId}</td>
                    <td>{row.currentSem}</td>
                    <td>{row.currentCgpa}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Box>
        </Box>
    );
}

export default Student;