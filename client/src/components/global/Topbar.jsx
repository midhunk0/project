import React from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";
import { useState } from "react";

const colors=tokens();
const Item = ({ title, to, selected, setSelected }) => {
    const isActive = selected === title;
    
    const itemStyle = {
        textDecoration: "none",
        color: isActive ? "#fff" : "inherit",
        backgroundColor: isActive ? colors.blueAccent[600] : "inherit",
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
    };

    return (
        <FlexBetween p="0.5rem 0rem" sx={{background:colors.blueAccent[500], color:"white"}}>
        {/* logo and name */}
            <FlexBetween gap="10px" marginLeft="10px">
                <Link
                    to="/"
                    onClick={() => setSelected("home")}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit",
                    }}
                >
                    <Box display="flex" alignItems="center" >
                        <PixIcon sx={{ fontSize: "28px" }} />
                        <Typography variant="h4" fontSize="16px" marginLeft="10px">
                            PMS
                        </Typography>
                    </Box>
                </Link>
            </FlexBetween>

            {/* topbar items */}
            <Box sx={{ display: { xs: "none", md: "flex"}, marginRight:"10px" }}>
                <FlexBetween gap="10px">
                    <Item
                        title="Home"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Student"
                        to="/student/login"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Recruiter"
                        to="/recruiter/login"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Alumni"
                        to="/alumni"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Contact"
                        to="/contact"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </FlexBetween>
            </Box>

            {/* hamburger menu */}
            <Box sx={{ display: { xs: "block", md: "none", background:colors.blueAccent[500]}, marginRight:"10px" }}>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuToggle}
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                >
                    <Item
                        title="Home"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Student"
                        to="/student/login"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Recruiter"
                        to="/recruiter"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Alumni"
                        to="/alumni"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Contact"
                        to="/contact"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Menu>
            </Box>
        </FlexBetween>
    );
};

export default Topbar;
