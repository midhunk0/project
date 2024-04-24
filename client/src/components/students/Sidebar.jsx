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
      // Handle admin login - redirect to the admin dashboard
      setTimeout(() => {
        navigate("/");
      }, 500);
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
    { title: "Notifications", to: "/student/notification" },
    { title: "Applied Companies", to: "/student/appliedcompanies" },
    { title: "Edit Profile", to: "/student/edit" },
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

const StudentSidebar = ({ username, profilePicture }) => {
  const [selected, setSelected] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const id = user._id;
  console.log(id);

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const dataStudent = useFetch(
    `http://localhost:8080/api/students/StudentProfile/${id}`
  );
  const student = dataStudent.data;

  return (
    <FlexBetween>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          height: "100%",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <Box display="flex">
          <Sidebar>
            <Box mb="25px" mt="45px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="user-profile"
                  width="100px"
                  height="100px"
                  src="../../assets/student_icon.png"
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
                  Welcome Back {student.username}!
                </Typography>
              </Box>
            </Box>
            <Box>{getMenuItems(selected, setSelected)}</Box>
          </Sidebar>
        </Box>
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
        <Toaster position="top-center" />
      </Box>
    </FlexBetween>
  );
};

export default StudentSidebar;
