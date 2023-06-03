import React from "react";
import { Box, Typography } from "@mui/material";

const AdminDashboard=()=>{
    return (
        <Box width="100%" margin="30px" border="1px lightgrey solid">
            <Typography variant="h4" m="10px">Admin Name:</Typography>
            <Typography variant="h4" m="10px">Admin Email:</Typography>
            <Typography variant="h4" m="10px">Admin Contact:</Typography>
        </Box>
    );
};

export default AdminDashboard;
