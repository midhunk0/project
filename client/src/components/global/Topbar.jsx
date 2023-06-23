import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";

const colors = tokens();

const DropdownMenu = ({ title, items, selected, setSelected }) => {
    const isActive = selected === title;

    const itemStyle = {
        textDecoration: "none",
        color: isActive ? colors.gray[900] : "inherit",
        backgroundColor: isActive ? colors.gray[100] : "inherit",
    };

    return (
        <li className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id={`${title.toLowerCase()}-dropdown`}
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {title}
            </a>
            <div
                className="dropdown-menu"
                aria-labelledby={`${title.toLowerCase()}-dropdown`}
            >
                {items.map((item) => (
                    <a
                        className="dropdown-item"
                        href={item.to}
                        onClick={() => setSelected(item.title)}
                        style={itemStyle}
                        key={item.title}
                    >
                        {item.title}
                    </a>
                ))}
            </div>
        </li>
    );
};

const Topbar = () => {
    const [selected, setSelected] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const menuItems = [
        { title: "Home", to: "/" },
        {
            title: "Student",
            items: [
                { title: "Student Login", to: "/student/login" },
                { title: "Placement Training", to: "/placement-training" },
                {
                    title: "Placement Rules & Regulations",
                    to: "/placement-rules_&_regulations",
                },
                { title: "Placement Experience", to: "/placement-experience" },
            ],
        },
        {
            title: "Recruiter",
            items: [
                { title: "Recruiter Login", to: "/recruiter/login" },
                { title: "Why Recruit?", to: "/why_recruit?" },
                { title: "Achievements", to: "/Achievements" },
                { title: "Recruiter's Policy", to: "/recruiter_policy" },
                { title: "Recruiter's Portal Guide", to: "/recruiter-guide" },
            ],
        },
        {
            title: "Alumni",
            items: [],
        },
        { title: "Contact", to: "/contact" },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link
                to="/"
                onClick={() => setSelected("home")}
                className="navbar-brand"
                style={{ color: "inherit", textDecoration: "inherit" }}
            >
                <Box display="flex" alignItems="center">
                    {/* <PixIcon sx={{ fontSize: "28px" }} /> */}
                    <img
                        src="/assets/cet_logo.png"
                        alt="Logo"
                        className="logo"
                        style={{ width: "50px", height: "50px" }}
                    />

                    {/* <Typography variant="h4" fontSize="16px" marginLeft="10px">
                        PMS
                    </Typography> */}
                </Box>
            </Link>
            <IconButton className="navbar-toggler" onClick={handleMenuToggle}>
                <MenuIcon />
            </IconButton>

            <div
                className={`collapse navbar-collapse${
                    isMenuOpen ? " show" : ""
                }`}
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-auto">
                    {menuItems.map((item) =>
                        item.items ? (
                            <DropdownMenu
                                key={item.title}
                                title={item.title}
                                items={item.items}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ) : (
                            <li
                                className={`nav-item${
                                    selected === item.title ? " active" : ""
                                }`}
                                key={item.title}
                            >
                                <Link
                                    className="nav-link"
                                    to={item.to}
                                    onClick={() => setSelected(item.title)}
                                    style={{
                                        color: "inherit",
                                        textDecoration: "inherit",
                                    }}
                                >
                                    {item.title}
                                    {selected === item.title && (
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Topbar;