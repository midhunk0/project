import React from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";


const StudentHome=()=>{

    // const [flag,setFlag]=useState(false);
    // const dataStudent=axios.get(`api/students/StudentProfile/${}`)
    const location=useLocation()
    console.log(location);
    return(
        <div>
            
        </div>
    )
    
}

export default StudentHome;