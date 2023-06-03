import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "./FlexBetween";

const Topbar=()=>{
    const colors=tokens();
    const [selected, setSelected]=useState("home");
    return(
        <FlexBetween 
            mb="0.25rem"
            p="0.5rem 0rem"
            color={colors.gray[300]}
        >
            {/* logo and name */}
            <FlexBetween gap="0.75rem" marginLeft="10px"> 
                <Link 
                    to="/" 
                    onClick={() => setSelected("home")}
                    style={{
                        color:"inherit",
                        textDecoration:"inherit"
                    }} 
                >
                    <Box display="flex" alignItems="center">
                        <PixIcon sx={{ fontSize:"28px"}} />
                        <Typography variant="h4" fontSize="16px" marginLeft="10px">
                            PMS
                        </Typography>
                    </Box>
                </Link>
            </FlexBetween>
            {/* topbar items */}
            <FlexBetween gap="2rem" marginRight="10px">
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/" 
                        onClick={() => setSelected("Home")}
                        style={{
                            color:selected==="Home" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        <Typography>Home</Typography>
                    </Link>
                </Box>
                <Box sx={{ "&:hover":{ color:colors.primary[100] }}}>
                    <Link 
                        to="/student" 
                        onClick={() => setSelected("Students")}
                        style={{
                            color:selected==="Students" ? "inherit" : colors.gray[700],
                            textDecoration:"inherit"
                        }}    
                    >
                        <Typography>Students</Typography>
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
                        <Typography>Recruiter</Typography>
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
                        <Typography>Alumni</Typography>
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
                        <Typography>Contact</Typography>
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}
export default Topbar;




