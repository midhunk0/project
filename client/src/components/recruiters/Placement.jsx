// import React, { useState } from "react";
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Typography,
//   Select,
//   MenuItem,
//   Box,
// } from "@mui/material";

// const RecruiterPlacement = () => {
//   const [selectedLink, setSelectedLink] = useState("Placement 2022");

//   const handleLinkChange = (event) => {
//     setSelectedLink(event.target.value);
//   };

//   const renderTable = (link) => {
//     // Mock data for demonstration
//     const data = [
//       { slNo: 1, companyName: "Company A", placements: 10 },
//       { slNo: 2, companyName: "Company B", placements: 15 },
//       { slNo: 3, companyName: "Company C", placements: 5 },
//     ];

//     return (
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Sl No</TableCell>
//               <TableCell>Company Name</TableCell>
//               <TableCell>Number of Placements</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.slNo}>
//                 <TableCell>{row.slNo}</TableCell>
//                 <TableCell>{row.companyName}</TableCell>
//                 <TableCell>{row.placements}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   const renderLinkList = () => {
//     const links = ["Placement 2022", "Placement 2021", "Placement 2020"];

//     return (
//       <Select
//         value={selectedLink}
//         onChange={handleLinkChange}
//         variant="outlined"
//         style={{ 
//             marginBottom: "10px",
//         }}
//       >
//         {links.map((link) => (
//           <MenuItem key={link} value={link}>
//             {link}
//           </MenuItem>
//         ))}
//       </Select>
//     );
//   };

//   return (
//     <Box margin="10px">
//         <Typography variant="h4" marginBottom="10px">Placement Records</Typography>
//       {renderLinkList()}
//       {selectedLink && (
//         <Box>
//           <Typography variant="h6">Table for {selectedLink}</Typography>
//           {renderTable(selectedLink)}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default RecruiterPlacement;








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