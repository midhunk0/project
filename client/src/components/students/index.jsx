import React from "react";
import { Box } from "@mui/material";
import StudentSidebar from "./StudentSidebar";
import { Outlet } from "react-router-dom";
import Login from "../global/Login";

const Student=()=>{
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return(
        <div>
            {isLoggedIn ? (
                <Box display="flex">
                    <StudentSidebar onLogout={handleLogout}/>
                    <Outlet/>
                </Box>
            ):(
                <Login/>
            )}
        </div>
    )
}

export default Student;