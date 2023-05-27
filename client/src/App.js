import React from "react";
import "./App.css";
import Topbar from "./components/global/Topbar";
import Home from "./components/home";
import Alumni from "./components/alumni";
import Contact from "./components/contact";
import Recruiter from "./components/recruiters";
import Student from "./components/students";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
    return (
        <Router basename="">
            <Topbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="alumni" element={<Alumni/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="recruiter" element={<Recruiter/>}/>
                <Route path="student/*" element={<Student/>}/>
            </Routes>
        </Router>
    );
}

export default App;
