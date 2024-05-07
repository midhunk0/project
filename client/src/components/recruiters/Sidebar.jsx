import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../global/FlexBetween";
import { Sidebar } from "react-pro-sidebar";
import { tokens } from "../../theme";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const colors = tokens();
const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (title === "Logout") {
      localStorage.clear();
      toast.success("Logged out Successfully!");
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
    { title: "Chat with Admin", to: "/recruiter/chat" },
    { title: "Send JAF", to: "/recruiter/form" },
    { title: "Student Applications", to: "/recruiter/applications" },
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
  const { user } = useContext(AuthContext);
  const id = user._id;

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const dataRecruiter = useFetch(
    `https://project-api-iwiy.onrender.com/api/recruiters/recruiterProfile/${id}`
  );
  const recruiter = dataRecruiter.data;

  return (
    <FlexBetween>
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
          <Box mb="25px" mt="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="user-profile"
                width="125px"
                height="125px"
                src="../../assets/user.jpg"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  margin: "10px",
                  border: "2px solid yellow", // Add yellow border
                }}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Typography variant="h5">
                Welcome Back {recruiter.companyName}!
              </Typography>
            </Box>
          </Box>
          {/* menu items */}
          <Box mb="25px">{getMenuItems(selected, setSelected)}</Box>
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
