import { Box } from "@mui/material";
import React from "react";
import ContactSidebar from "./ContactSidebar";
import { Outlet } from "react-router-dom";

const Contact=()=>{
    return(
        <div>
            <Box display="flex">
                <ContactSidebar/>
                <Outlet/>
            </Box>
        </div>
    )
}
export default Contact;