import { Box } from "@mui/material";
import React from "react";
import RecruiterSidebar from "./RecruiterSidebar";
import { Outlet } from "react-router-dom";

const Recruiter=()=>{
    return(
        <div>
            <Box display="flex">
                <RecruiterSidebar/>
                <Outlet/>
            </Box>
        </div>
    )
}

export default Recruiter;