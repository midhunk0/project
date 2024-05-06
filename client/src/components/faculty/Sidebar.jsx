import React, { useState } from "react";
import { Sidebar } from "react-pro-sidebar";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { tokens } from "../../theme";
import toast from "react-hot-toast";
import FlexBetween from "../global/FlexBetween";

const colors = tokens();
const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (title === "Logout") {
      localStorage.clear();
      toast.success("Logged out Successfully!");
      setTimeout(() => {
        navigate("/faculty/login");
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
    { title: "Home", to: "/faculty/home" },
    { title: "Student Credits", to: "/faculty/studentcredits" },
    { title: "Edit", to: "/faculty/edit" },
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

const FacultySidebar = () => {
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
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          height: "100%",
        }}
      >
        <Sidebar>
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="user-profile"
                width="100px"
                height="100px"
                src="../../assets/faculty.png"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  marginTop: "40px",
                }}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Typography variant="h5">Dashboard</Typography>
            </Box>
          </Box>
          <Box>{getMenuItems(selected, setSelected)}</Box>
        </Sidebar>
      </Box>
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

export default FacultySidebar;
