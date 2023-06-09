// import React from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Typography, Box } from "@mui/material";
// import { Link } from "react-router-dom";

// const Item=({ title, to })=>{
//     return(
//         <MenuItem>
//             <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
//                 <Typography>{title}</Typography>
//             </Link>
//         </MenuItem>
//     )
// } 

// const RecruiterSidebar=()=>{
//     return(
//         <Box display="flex">
//             <Sidebar>
//                 <Menu>
//                     {/* user image and name*/}
//                     <Box mb="25px">
//                         <Box
//                             display="flex"
//                             justifyContent="center"
//                             alignItems="center"
//                         >
//                             <img
//                                 alt="user-profile"
//                                 width="100px"
//                                 height="100px"
//                                 src={`../../assets/user.png`}
//                                 style={{cursor:"pointer", borderRadius:"50%", margin:"10px"}}
//                             />
//                         </Box>
//                         <Box textAlign="center">
//                             <Typography
//                                 variant="h2"
//                                 sx={{
//                                     m:"10px 0 0 0",
//                                     fontSize:"2rem"
//                                 }}                                
//                             >
//                                 tim cook
//                             </Typography>
//                         </Box>
//                     </Box>
//                     {/* menu items */}
//                     <Box>
//                         <Item
//                             title="Home"
//                             to="/recruiter"
//                         />
//                         <Item
//                             title="Why Recruit?"
//                             to="/recruiter/why"
//                         />
//                         <Item
//                             title="Achivements"
//                             to="/recruiter/achivement"
//                         />
//                         <Item
//                             title="Recruiter's Portal"
//                             to="/recruiter/portal"
//                         />
//                         <Item
//                             title="Extra Curriculars"
//                             to="/recruiter/extra"
//                         />
//                         <Item
//                             title="Internships"
//                             to="/recruiter/internship"
//                         />
//                         <Item
//                             title="Placement Records"
//                             to="/recruiter/placement"
//                         />
//                     </Box>
//                 </Menu>
//             </Sidebar>
//         </Box>
//     )
// }

// export default RecruiterSidebar;


import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../global/FlexBetween";
import { Sidebar } from "react-pro-sidebar";

const Item = ({ title, to, selected, setSelected }) => {
  const isActive = selected === title;
  const itemStyle = {
    textDecoration: "none",
    color: isActive ? "#fff" : "inherit",
    backgroundColor: isActive ? "#000" : "inherit",
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
const colors=tokens();
const RecruiterSidebar = () => {
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
    <FlexBetween marginLeft="30px" marginRight="30px" p="0.5rem 0rem">
      {/* logo and name */}
      <Box sx={{ display: { xs: "none", md: "flex" }, background:colors.primary[900], height:"88vh" }}>
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
                  Tim Cook
                </Typography>
              </Box>
            </Box>
            {/* menu items */}
            <Box>
              <Item
                title="Home"
                to="/recruiter"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Why Recruit?"
                to="/recruiter/why"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Achievements"
                to="/recruiter/achievement"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recruiter's Portal"
                to="/recruiter/portal"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Extra Curriculars"
                to="/recruiter/extra"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Internships"
                to="/recruiter/internship"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Placement Records"
                to="/recruiter/placement"
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
            title="Home"
            to="/recruiter"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Why Recruit?"
            to="/recruiter/why"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Achievements"
            to="/recruiter/achievement"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Recruiter's Portal"
            to="/recruiter/portal"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Extra Curriculars"
            to="/recruiter/extra"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Internships"
            to="/recruiter/internship"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Placement Records"
            to="/recruiter/placement"
            selected={selected}
            setSelected={setSelected}
          />
        </Menu>
      </Box>
    </FlexBetween>
  );
};

export default RecruiterSidebar;
