import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../global/FlexBetween";
import { Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";

const colors = tokens();

const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;

  const handleLogout = () => {
    if (title === "Logout") {
      localStorage.clear();
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
    { title: "Profile", to: "/student/home" },
    { title: "Resume", to: "/student/Resume" },
    { title: "Internship Experience", to: "/student/internship" },
    { title: "Placements", to: "/student/placement" },
    { title: "Notifications", to: "/student/notification" },
    { title: "Preparations", to: "/student/preparation" },
    { title: "Graduate Study Cell", to: "/student/studycell" },
    { title: "International Opportunities", to: "/student/international" },
    { title: "Edit Profile", to: "/student/edit" },
    { title: "Logout", to: "/student/login" },
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

const StudentSidebar = () => {
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
    <FlexBetween>
      <Box sx={{ display: { xs: "none", md: "flex" }, height: "100vh" }}>
        <Box display="flex">
          <Sidebar>
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
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
                  midhun
                </Typography>
              </Box>
            </Box>
            <Box>{getMenuItems(selected, setSelected)}</Box>
          </Sidebar>
        </Box>
      </Box>
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
          {getMenuItems(selected, setSelected)}
        </Menu>
      </Box>
    </FlexBetween>
  );
};

export default StudentSidebar;
