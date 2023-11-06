import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import FacultySidebar from "./Sidebar";

const Faculty = () => {
    return(
        <Box display="flex">
            <FacultySidebar/>
            <Outlet/>
        </Box>
    )
}

export default Faculty;