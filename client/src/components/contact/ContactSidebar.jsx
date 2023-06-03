import React, { useState } from "react";
import { tokens } from "../../theme";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Item=({ title, to, selected, setSelected })=>{
    const colors=tokens();
    return(
        <MenuItem
            active={selected===title}
            style={{color:colors.gray[100]}}
            onClick={()=>setSelected(title)}
        >
            <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    )
} 

const ContactSidebar=()=>{
    const [selected, setSelected]=useState();
    return(
        <Box display="flex">
            <Sidebar>
                <Menu>
                    {/* user image and name*/}
                    <Box mb="25px">
                        <Box textAlign="center">
                            <Typography
                                variant="h2"
                                sx={{
                                    m:"10px 0 0 0",
                                    fontSize:"2rem"
                                }}                                
                            >
                                About
                            </Typography>
                        </Box>
                    </Box>
                    {/* menu items */}
                    <Box>
                        <Item
                            title="About CGPU"
                            to="/contact/about"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="CGPU Team"
                            to="/contact/cgpu"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Website Team"
                            to="/contact/website"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default ContactSidebar;

