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

const AdminSidebar=()=>{
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
                                Admin Panel
                            </Typography>
                        </Box>
                    </Box>
                    {/* menu items */}
                    <Box>
                        <Item
                            title="Dashboard"
                            to="/admin/dashboard"
                        />
                        <Item
                            title="Invitations"
                            to="/admin/invitations"
                        />
                        <Item
                            title="Students"
                            to="/admin/students"
                        />
                        <Item
                            title="Recruiters"
                            to="/admin/recruiters"
                        />
                        <Item
                            title="Logout"
                            to="/"
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default AdminSidebar;