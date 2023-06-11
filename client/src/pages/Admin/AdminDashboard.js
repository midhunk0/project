import React from "react";
import { Box, Typography } from "@mui/material";

const AdminDashboard=()=>{
    return (
        <Box width="100%" margin="10px" border="1px solid gray" padding="10px">
            <Typography variant="h4" >Admin Name:</Typography>
            <Typography variant="h4" >Admin Email:</Typography>
            <Typography variant="h4" >Admin Contact:</Typography>
        </Box>
    );
};

export default AdminDashboard;
