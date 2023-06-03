import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Item=({ title, to })=>{
    return(
        <MenuItem>
            <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    )
} 

const ContactSidebar=()=>{
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
                        />
                        <Item
                            title="CGPU Team"
                            to="/contact/cgpu"
                        />
                        <Item
                            title="Website Team"
                            to="/contact/website"
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default ContactSidebar;