import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Item=({ title, to })=>{
    return(
        <MenuItem>
            <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    )
} 

const StudentSidebar=()=>{
    return(
        <Box display="flex">
            <Sidebar>
                <Menu>
                    {/* user image and name*/}
                    <Box mb="25px">
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img
                                alt="user-profile"
                                width="100px"
                                height="100px"
                                src={`../../../assets/user.png`}
                                style={{cursor:"pointer", borderRadius:"50%", margin:"10px"}}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h2"
                                sx={{
                                    m:"10px 0 0 0",
                                    fontSize:"2rem"
                                }}                                
                            >
                                midhun
                            </Typography>
                        </Box>
                    </Box>
                    {/* menu items */}
                    <Box>
                        <Item title="Home" to="/student/home"/>
                        <Item title="Soft Skill Resources" to="/student/skill"/>
                        <Item title="Internships" to="/student/internship"/>
                        <Item title="Placements" to="/student/placement"/>
                        <Item title="Notifications" to="/student/notification"/>
                        <Item title="Preperations" to="/student/preperation"/>
                        <Item title="Graduate Study Cell" to="/student/studycell"/>
                        <Item title="International Opportunities" to="/student/international"/>
                        <Item title="Edit Profile" to="/student/edit"/>
                        <Item title="Logout" to="/student/login"/>
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default StudentSidebar;