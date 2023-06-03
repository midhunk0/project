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

const RecruiterSidebar=()=>{
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
                                tim cook
                            </Typography>
                        </Box>
                    </Box>
                    {/* menu items */}
                    <Box>
                        <Item
                            title="Home"
                            to="/recruiter"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Why Recruit?"
                            to="/recruiter/why"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Achivements"
                            to="/recruiter/achivement"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Recruiter's Portal"
                            to="/recruiter/portal"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Extra Curriculars"
                            to="/recruiter/extra"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Internships"
                            to="/recruiter/internship"
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Placement Records"
                            to="/recruiter/placement"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default RecruiterSidebar;