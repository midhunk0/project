import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
    { 
        field: "id", 
        headerName: "ID", 
        width: 70 
    },
    { 
        field: "name", 
        headerName: "Name", 
        width: 130 
    },
    {
        field: "collegeId",
        headerName: "College Id",
        width: 130
    },
    {
        field: "currentSem",
        headerName: "Current Semester",
        width: 130
    },
    {
        field: "currentCgpa",
        headerName: "Current CGPA",
        width: 130
    }
];

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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                />
            </Box>
        </Box>
    );
}

export default Student;