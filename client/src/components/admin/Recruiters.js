import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { Table } from 'react-bootstrap';

const columns = [
    { 
        field: "id", 
        headerName: "ID",

    },
    { 
        field: "companyName", 
        headerName: "Name",
 
    },
    {
        field: "ceo",
        headerName: "CEO",

    },
    {
        field: "vacancy",
        headerName: "No of vacancies",

    },
    {
        field: "placed",
        headerName: "No of Placed",

    },
    {
        field: "package",
        headerName: "Package",

    }
];

const rows = [
    { id: 1, companyName: "Apple", ceo: "Tim Cook", vacancy: 23, placed: 10, package: 1000000 },
    { id: 2, companyName: "Google", ceo: "Sundar Pichai", vacancy: 65, placed: 24, package: 700000 },
    { id: 3, companyName: "Meta", ceo: "Mark Zuckerberg", vacancy: 16, placed: 8, package: 2500000 },
    { id: 4, companyName: "Space X", ceo: "Elon Musk", vacancy: 45, placed: 37, package: 800000 },
    { id: 5, companyName: "Microsoft", ceo: "Satya Nadella", vacancy: 51, placed: 26, package: 300000 },
    { id: 6, companyName: "Amazon", ceo: "Andy Jassy", vacancy: 35, placed: 26, package: 1500000 },
];

const Recruiter = () => {
    return (
        <Box margin="10px">
            <Typography variant="h4" marginBottom="10px">Recruiter Details</Typography>
            <Box
                sx={{
                '& .MuiTablePagination-selectLabel': {
                    marginTop: '16px',
                },
                '& .MuiTablePagination-displayedRows': {
                    marginTop: '16px',
                },
                }}
            >
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>CEO</th>
                    <th>Vacancy</th>
                    <th>Placed</th>
                    <th>Package</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.companyName}</td>
                    <td>{row.ceo}</td>
                    <td>{row.vacancy}</td>
                    <td>{row.placed}</td>
                    <td>{row.package}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Box>
        </Box>
    );
}

export default Recruiter;
