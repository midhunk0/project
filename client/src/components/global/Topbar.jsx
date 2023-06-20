import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";

const colors = tokens();

const Item = ({ title, to, selected, setSelected }) => {
    const isActive = selected === title;

    const itemStyle = {
        textDecoration: "none",
        color: isActive ? colors.gray[900] : "inherit",
        backgroundColor: isActive ? colors.gray[100] : "inherit",
    };

    return (
        <MenuItem
            onClick={() => {
                setSelected(title);
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
        { title: "Home", to: "/" },
        { title: "Student", to: "/student/login" },
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
        />
    ));
};

const Topbar = () => {
    const [selected, setSelected] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuToggle = (event) => {
        setAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    return (
        <FlexBetween p="0.5rem 0rem">
            {/* logo and name */}
            <FlexBetween gap="10px" marginLeft="10px">
                <Link
                    to="/"
                    onClick={() => setSelected("home")}
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
                    {getMenuItems(selected, setSelected)}
                </FlexBetween>
            </Box>

            {/* hamburger menu */}
            <Box sx={{ display: { xs: "block", md: "none" }, marginRight: "10px" }}>
                <IconButton color="inherit" aria-label="menu" onClick={handleMenuToggle}>
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

export default Topbar;
