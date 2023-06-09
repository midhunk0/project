// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import { tokens } from "../../theme";
// import { Link } from "react-router-dom";
// import PixIcon from "@mui/icons-material/Pix";
// import FlexBetween from "./FlexBetween";

// const Item=({ title, to, selected, setSelected })=>{
//     const colors=tokens();
//     return(
//         <Box>
//             <Link 
//                 to={to}
//                 onClick={()=>setSelected(title)}
//                 style={{
//                     color:selected===title ? "inherit" : colors.gray[700],
//                     textDecoration:"inherit"
//                 }}    
//             >
//                 <Typography>{title}</Typography>
//             </Link>
//         </Box>
//     )
// }

// const Topbar=()=>{
//     const [selected, setSelected]=useState("home");
//     return(
//         <FlexBetween 
//             mb="0.25rem"
//             p="0.5rem 0rem"
//         >
//             {/* logo and name */}
//             <FlexBetween gap="0.75rem" marginLeft="10px"> 
//                 <Link 
//                     to="/" 
//                     onClick={() => setSelected("home")}
//                     style={{
//                         color:"inherit",
//                         textDecoration:"inherit"
//                     }} 
//                 >
//                     <Box display="flex" alignItems="center">
//                         <PixIcon sx={{ fontSize:"28px"}} />
//                         <Typography variant="h4" fontSize="16px" marginLeft="10px">
//                             PMS
//                         </Typography>
//                     </Box>
//                 </Link>
//             </FlexBetween> 
//             {/* topbar items */}
//             <FlexBetween gap="2rem" marginRight="20px">
//                 <Item
//                     title="Home"
//                     to="/"
//                     selected={selected}
//                     setSelected={setSelected}
//                 />
//                 <Item
//                     title="Student"
//                     to="/student/login"
//                     selected={selected}
//                     setSelected={setSelected}
//                 />
//                 <Item
//                     title="Recruiter"
//                     to="/recruiter"
//                     selected={selected}
//                     setSelected={setSelected}
//                 />
//                 <Item
//                     title="Alumni"
//                     to="/alumni"
//                     selected={selected}
//                     setSelected={setSelected}
//                 />
//                 <Item
//                     title="Contact"
//                     to="/contact"
//                     selected={selected}
//                     setSelected={setSelected}
//                 />
//             </FlexBetween>
//         </FlexBetween>
//     )
// }
// export default Topbar;



import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";

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
        <FlexBetween marginLeft="30px" marginRight="30px" p="0.5rem 0rem">
        {/* logo and name */}
            <FlexBetween gap="0.75rem">
                <Link
                    to="/"
                    onClick={() => setSelected("home")}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit",
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
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <FlexBetween gap="2rem">
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
                </FlexBetween>
            </Box>

            {/* hamburger menu */}
            <Box sx={{ display: { xs: "block", md: "none" }, marginRight: "10px" }}>
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
