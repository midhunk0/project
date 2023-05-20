import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Typography, Box, } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";

const Item=({ title, to,selected, setSelected })=>{
    // const theme=useTheme();
    const colors=tokens();
    return(
        <MenuItem
            active={selected===title}
            style={{color:colors.gray[100]}}
            onClick={()=>setSelected(title)}
        >
            <Typography>{title}</Typography>
            <Link to={to}></Link>
        </MenuItem>
    )
}

const StudentsSidebar=()=>{
    // const theme=useTheme();
    // const colors=tokens();
    const [selected, setSelected]=useState("Home");

    return(
        <Box>
            <Sidebar>
                <Menu>
                    {/* logo and menu icon */}
                    <MenuItem
                        style={{
                            margin:"10px 0 20px 0",
                            // color:colors.gray[100]
                        }}
                    >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                margin="10px"
                                // flexDirection="column"
                            >
                                <PixIcon sx={{ fontSize:"2.5rem" }}/>
                                <Typography
                                    variant="h3"
                                    // color={colors.gray[100]}
                                    sx={{
                                        fontSize:"3rem"
                                    }}
                                >
                                    CGPU
                                </Typography>
        
                            </Box>
                    </MenuItem>
                    {/* user */}
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
                                    style={{cursor:"pointer", borderRadius:"50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    // color={colors.gray[100]}
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
                    <Box >
                        <Item
                            title="Home"
                            to="/"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Soft Skill Resources"
                            to="/skill"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Internships"
                            to="/internship"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Placements"
                            to="/placement"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Notifications"
                            to="/notification"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Preperations"
                            to="/preperation"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Graduate Study Cell"
                            to="/gsc"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="International Opportunities"
                            to="/opportunity"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Edit Profile"
                            to="/edit"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default StudentsSidebar;