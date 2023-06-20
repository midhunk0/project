import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns=[
    {
        field: "id",
        headerName: "Sl No"
    },
    {
        field: "company",
        headerName: "Company"
    },    
    {
        field: "placements",
        headerName: "Placemnts"
    },
]

const rows=[
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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                        },
                    }}
                      checkboxSelection
                    pageSizeOptions={[5, 10]}
                />
            </Box>
        </Box>
    )
}

export default RecruiterPlacement