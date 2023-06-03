import React from "react";
import { Box } from "@mui/material";
import RecruiterSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Recruiter=()=>{
    return(
        <Box display="flex">
            <RecruiterSidebar/>
            <Outlet/>
        </Box>
    )
}

export default Recruiter;