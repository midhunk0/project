import React from "react";
import { Box, Typography } from "@mui/material";
import { Table } from "react-bootstrap";


const placements=[
    {id: 1, company: "Apple", placements: 10},
    {id: 2, company: "Google", placements: 24},
    {id: 3, company: "Meta", placements: 8},
    {id: 4, company: "Space X", placements: 37},
    {id: 5, company: "Microsoft", placements: 26},
    {id: 6, company: "Amazon", placements: 26},

]

const RecruiterPlacement=()=>{
    return(
        <Box margin="10px">
            <Typography variant="h4" marginBottom="10px">Placement Records</Typography>
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
            <Table striped bordered hover responsive >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Placements</th>
                </tr>
                </thead>
                <tbody>
                {placements.map((placement, index) => (
                    <tr key={placement.id}>
                    <td>{index + 1}</td>
                    <td>{placement.company}</td>
                    <td>{placement.placements}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Box>
        </Box>
    )
}

export default RecruiterPlacement