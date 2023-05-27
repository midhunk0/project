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

const StudentSidebar=()=>{
    const [selected, setSelected]=useState();
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
                                src={`../../assets/user.png`}
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
                        <Item
                            title="Home"
                            to="/student"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Soft Skill Resources"
                            to="/student/skill"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Internships"
                            to="/student/internship"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Placements"
                            to="/student/placement"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Notifications"
                            to="/student/notification"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Preperations"
                            to="/student/preperation"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Graduate Study Cell"
                            to="/student/studycell"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="International Opportunities"
                            to="/student/international"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Edit Profile"
                            to="/student/edit"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Logout"
                            to="/student/login"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default StudentSidebar;