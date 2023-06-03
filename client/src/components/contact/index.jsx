import React from "react";
import { Box } from "@mui/material";
import ContactSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Contact=()=>{
    return(
        <Box display="flex">
            <ContactSidebar/>
            <Outlet/>
        </Box>
    )
}
export default Contact;