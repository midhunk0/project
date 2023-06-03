import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "./FlexBetween";

const Item=({ title, to, selected, setSelected })=>{
    const colors=tokens();
    return(
        <Box>
            <Link 
                to={to}
                onClick={()=>setSelected(title)}
                style={{
                    color:selected===title ? "inherit" : colors.gray[700],
                    textDecoration:"inherit"
                }}    
            >
                <Typography>{title}</Typography>
            </Link>
        </Box>
    )
}

const Topbar=()=>{
    const [selected, setSelected]=useState("home");
    return(
        <FlexBetween 
            mb="0.25rem"
            p="0.5rem 0rem"
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
            <FlexBetween gap="2rem" marginRight="20px">
                <Item
                    title="Home"
                    to="/"
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Student"
                    to="/student"
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Recruiter"
                    to="/recruiter"
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Alumni"
                    to="/alumni"
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Contact"
                    to="/contact"
                    selected={selected}
                    setSelected={setSelected}
                />
            </FlexBetween>
        </FlexBetween>
    )
}
export default Topbar;