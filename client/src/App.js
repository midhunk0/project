import "./App.css";
import React from "react";
// import Topbar from "./components/global/Topbar";
// @ts-ignore
import StudentsSidebar from "./components/global/StudentsSibebar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router basename="">
            {/* <Topbar/> */}
            <StudentsSidebar/>
        </Router>
    );
}

export default App;
