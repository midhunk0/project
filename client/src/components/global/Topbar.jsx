import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";

const colors = tokens();

const DropdownMenu = ({ anchorEl, handleClose }) => {
    const menuItems = [
        { title: "Profile", to: "/student/profile" },
        { title: "Settings", to: "/student/settings" },
        { title: "Login", to: "/student/login" },
    ];

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            // transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
            {menuItems.map((item) => (
                <MenuItem key={item.title} component={Link} to={item.to} onClick={handleClose}>
                    {item.title}
                </MenuItem>
            ))}
        </Menu>
    );
};

const Item = ({ title, to, selected, setSelected, handleDropdown }) => {
    const isActive = selected === title;

    const itemStyle = {
        textDecoration: "none",
        color: isActive ? colors.gray[900] : "inherit",
        backgroundColor: isActive ? colors.gray[100] : "inherit",
        borderRadius: "5px"
    };

    return (
        <MenuItem
            onClick={() => {
                setSelected(title);
                handleDropdown();
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

const getMenuItems = (selected, setSelected, handleDropdown) => {
    const menuItems = [
        { title: "Home", to: "/" },
        { title: "Student" },
        { title: "Recruiter", to: "/recruiter/login" },
        { title: "Alumni", to: "/alumni" },
        { title: "Contact", to: "/contact" },
    ];

    return menuItems.map((item) => (
        <Item
            key={item.title}
            title={item.title}
            to={item.to}
            selected={selected}
            setSelected={setSelected}
            handleDropdown={handleDropdown}
        />
    ));
};

const Topbar = () => {
    const [selected, setSelected] = useState("Home");
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuToggle = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDropdown = () => {
        if (selected === "Student") {
            setAnchorEl((prevAnchorEl) => !prevAnchorEl);
        }
    };

    return (
        <FlexBetween p="0.5rem 0rem">
            {/* logo and name */}
            <FlexBetween gap="10px" marginLeft="10px">
                <Link
                    to="/"
                    onClick={() => setSelected("Home")}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit"
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <PixIcon sx={{ fontSize: "28px" }} />
                        <Typography variant="h4" fontSize="16px" marginLeft="10px">
                            PMS
                        </Typography>
                    </Box>
                </Link>
            </FlexBetween>

            {/* topbar items */}
            <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: "10px" }}>
                <FlexBetween gap="10px">
                    {getMenuItems(selected, setSelected, handleDropdown)}
                </FlexBetween>
            </Box>

            {/* hamburger menu */}
            <Box sx={{ display: { xs: "block", md: "none" }, marginRight: "10px" }}>
                <IconButton color="inherit" aria-label="menu" onClick={handleMenuToggle}>
                    <MenuIcon />
                </IconButton>
                {selected === "Student" && (
                    <DropdownMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
                )}
            </Box>
        </FlexBetween>
    );
};

export default Topbar;
