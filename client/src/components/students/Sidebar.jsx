import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../global/FlexBetween";
import { Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";

const colors=tokens();
const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;
    
  const itemStyle = {
    textDecoration: "none",
    height:"50px",
    color: isActive ? "#fff" : "inherit",
    backgroundColor: isActive ? colors.blueAccent[500] : "inherit",
    "&:hover": {
      backgroundColor: isActive ? "#000" : "#f5f5f5",
    },
  };

  return (
    <MenuItem
      onClick={() => setSelected(title)}
      selected={isActive}
      component={Link}
      to={to}
      style={itemStyle}
    >
      {title}
    </MenuItem>
  );
};

const StudentSidebar = () => {
  const [selected, setSelected] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

    return (
        <FlexBetween sx={{background:colors.blueAccent[500]}}>
        {/* logo and name */}
            <Box sx={{ display: { xs: "none", md: "flex" }, height:"100vh" }}>
                {/* topbar items */}
                <Box display="flex" >
                    <Sidebar>
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
                            src="../../assets/user.png"
                            style={{ cursor: "pointer", borderRadius: "50%", margin: "10px" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                            variant="h2"
                            sx={{
                                m: "10px 0 0 0",
                                fontSize: "2rem"
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
                                to="/student/home"
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
                    </Sidebar>
                </Box>
            </Box>
            {/* hamburger menu */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                >
                    <Item 
                        title="Home" 
                        to="/student/home"
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
                </Menu>
            </Box>
        </FlexBetween>
    );
};

export default StudentSidebar;
