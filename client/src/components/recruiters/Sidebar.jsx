import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../global/FlexBetween";
import { Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";
import toast, { Toaster } from "react-hot-toast";

const colors = tokens();
const Item = ({ title, to, selected, setSelected }) => {
    const isActive = selected === title;
    const navigate = useNavigate();

    const handleLogout = () => {
        if (title === "Logout") {
            localStorage.clear();
            toast.success("Logged out Successfully!");
            // Handle admin login - redirect to the admin dashboard
            setTimeout(() => {
                navigate("/recruiter/login");
            }, 1500);
        }
    };
    const itemStyle = {
        textDecoration: "none",
        height: "50px",
        color: isActive ? "#fff" : "inherit",
        backgroundColor: isActive ? colors.gray[100] : "inherit",
        "&:hover": {
            backgroundColor: isActive ? "#000" : "#f5f5f5",
        },
    };

    return (
        <MenuItem
            onClick={() => {
                setSelected(title);
                handleLogout();
            }}
            selected={isActive}
            component={Link}
            to={to}
            style={itemStyle}
        >
            {title}
        </MenuItem>
    );
};

const getMenuItems = (selected, setSelected) => {
    const menuItems = [
        { title: "Home", to: "/recruiter/home" },
        { title: "Request to Admin", to: "/recruiter/request" },
        { title: "Schedules", to: "/recruiter/schedules" },
        { title: "Matched students", to: "/recruiter/matched" },
        { title: "Edit profile", to: "/recruiter/edit" },
        { title: "Logout" },
    ];

    return menuItems.map((item) => (
        <Item
            key={item.title}
            title={item.title}
            to={item.to}
            selected={selected}
            setSelected={setSelected}
        />
    ));
};
const RecruiterSidebar = () => {
    const [selected, setSelected] = useState();
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
        <FlexBetween >
            {/* logo and name */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    height: "100%",
                    
                   
                }}
            >
                {/* topbar items */}
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
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    margin: "10px",
                                }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h2"
                                sx={{
                                    m: "10px 0 0 0",
                                    fontSize: "2rem",
                                }}
                            >
                                Recruiter
                            </Typography>
                        </Box>
                    </Box>
                    {/* menu items */}
                    <Box>{getMenuItems(selected, setSelected)}</Box>
                </Sidebar>
            </Box>
            {/* hamburger menu */}
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    height: "100%",
                    marginTop: "20px",
                }}
            >
                <IconButton
                    color="inherit"
                    onClick={handleMenuToggle}
                    style={{ outline: "none" }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                >
                    {getMenuItems(selected, setSelected)}
                </Menu>
            </Box>
        </FlexBetween>
    );
};

export default RecruiterSidebar;
