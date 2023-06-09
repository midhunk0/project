import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./Sidebar";

const Student=()=>{
    return(
        <Box display="flex">
            <StudentSidebar/>
            <Outlet/>
        </Box>
    )
}

export default Student;