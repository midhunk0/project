// @ts-nocheck
import React, { useState } from "react";
// eslint-disable-next-line
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import FlexBetween from "./FlexBetween";

const Topbar=()=>{
    const theme=useTheme();
    const colors=tokens(theme.palette);
    const [selected, setSelected]=useState("home");
    return(
        <FlexBetween 
            mb="0.25rem"
            p="0.5rem 0rem"
            color={colors.gray[300]}
        >
            <FlexBetween gap="0.75rem"> 
                <Link 
                    to="/" 
                    onClick={() => setSelected("home")}
                    style={{
                        color:"inherit",
                        textDecoration:"inherit"
                    }} 
                >
                    <Box display="flex" alignItems="center">
                        <PixIcon sx={{ fontSize:"28px" }}/>
                        <Typography variant="h4" fontSize="16px">
                            PMS
                        </Typography>
                    </Box>
                </Link>
            </FlexBetween>

            <FlexBetween gap="2rem">
            <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/" 
                        onClick={() => setSelected("Home")}
                        style={{
                            color:selected==="Home" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        {/* <IconButton>
                            <HomeOutlinedIcon/>
                        </IconButton> */}
                        Home
                    </Link>
                </Box>
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/students" 
                        onClick={() => setSelected("Students")}
                        style={{
                            color:selected==="Students" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        Students
                    </Link>
                </Box>
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/recruiter" 
                        onClick={() => setSelected("Recruiter")}
                        style={{
                            color:selected==="Recruiter" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        Recruiter
                    </Link>
                </Box>
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/alumni" 
                        onClick={() => setSelected("Alumni")}
                        style={{
                            color:selected==="Alumni" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        Alumni
                    </Link>
                </Box>
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/contact" 
                        onClick={() => setSelected("Contact")}
                        style={{
                            color:selected==="Contact" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        Contact
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}
export default Topbar;