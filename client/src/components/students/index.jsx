import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import StudentSidebar from "./StudentSidebar";
import Register from "../global/Register";
import Login from "../global/Login";
import Edit from "./Edit";
import International from "./International";
import Internship from "./Internship";
import Notification from "./Notification";
import Placement from "./Placement";
import Preperation from "./Preperation";
import Skill from "./Skill";
import StudyCell from "./StudyCell";

const Student=()=>{
    return(
        <div>
            <Box display="flex">
                <StudentSidebar/>
                <Routes>
                    <Route path="/edit" element={<Edit/>}/>
                    <Route path="/international" element={<International/>}/>
                    <Route path="/internship" element={<Internship/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/placement" element={<Placement/>}/>
                    <Route path="/preperation" element={<Preperation/>}/>
                    <Route path="/skill" element={<Skill/>}/>
                    <Route path="/studycell" element={<StudyCell/>}/>
                    <Route path="/logout" element={<Login/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Routes>
            </Box>
        </div>
    )
}

export default Student;