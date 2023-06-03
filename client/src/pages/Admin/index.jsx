import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Admin=()=>{
    return(
        <div>
            <Box display="flex">
                <AdminSidebar/>
                <Outlet/>
            </Box>
        </div>
    )
}

export default Admin;