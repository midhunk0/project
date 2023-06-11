import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "react-pro-sidebar";
import FlexBetween from "../../components/global/FlexBetween";

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
const AdminSidebar = () => {
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
      <Box sx={{ display: { xs: "none", md: "flex" }, height:"100vh"}}>
        {/* topbar items */}
        <Box display="flex">
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
                  Admin Panel
                </Typography>
              </Box>
            </Box>
            {/* menu items */}
            <Box>
              <Item
                title="Dashboard"
                to="/admin/dashboard"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invitations"
                to="/admin/invitations"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Students"
                to="/admin/students"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recruiters"
                to="/admin/recruiters"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/"
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
                title="Dashboard"
                to="/admin/dashboard"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invitations"
                to="/admin/invitations"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Students"
                to="/admin/students"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recruiters"
                to="/admin/recruiters"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/"
                selected={selected}
                setSelected={setSelected}
              />
        </Menu>
      </Box>
    </FlexBetween>
  );
};

export default AdminSidebar;
