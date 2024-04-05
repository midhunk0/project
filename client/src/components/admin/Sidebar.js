import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";
import FlexBetween from "../global/FlexBetween";

const colors = tokens();

const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;

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

const getMenuItems = (selected, setSelected) => {
  const menuItems = [
    { title: "Dashboard", to: "/admin/dashboard" },
    { title: "Invitations", to: "/admin/invitations" },
    { title: "Students", to: "/admin/students" },
    { title: "Requested Company", to: "/admin/company" },
    { title: "Chats", to: "/admin/chat" },
    { title: "View JAF", to: "/admin/viewjaf" },
    { title: "Talks & Sessions", to: "/admin/talksandsessions" },
    { title: "Student Applications", to: "/admin/studentApplications" },
    { title: "Accepted Students", to: "/admin/accepted" },
    { title: "Logout", to: "/" },
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

const AdminSidebar = () => {
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
      {/* logo and name */}
      <Box sx={{ display: { xs: "none", md: "flex" }, height: "100%" }}>
        {/* topbar items */}
        <Box display="flex">
          <Sidebar>
            {/* user image and name*/}
            <Box mb="25px" mt="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="user-profile"
                  width="100px"
                  height="100px"
                  src="../../assets/admin_image.png"
                  style={{
                    alt: "admin-profile",
                    width: "125px",
                    height: "125px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    margin: "10px",
                    
                  }}
                />
              </Box>
              <Box textAlign="center" mt={2}>
              <Typography variant="h5">
                Welcome Admin!
              </Typography>
            </Box>
            </Box>
            {/* menu items */}
            <Box mb="25px">{getMenuItems(selected, setSelected)}</Box>
          </Sidebar>
        </Box>
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

export default AdminSidebar;
