import React from "react";
import StudentRepSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const StudentRep = () => { 
    return(
        <div style={{display: "flex"}}>
            <StudentRepSidebar/>
            <Outlet/>
        </div>
    )
}

export default StudentRep;