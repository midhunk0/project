import React from "react";
import "./App.css";
import Footer from "./components/global/footer";
import Topbar from "./components/global/Topbar";
import Home from "./components/home";
import Alumni from "./components/alumni";
import Contact from "./components/contact";
import Recruiter from "./components/recruiters";
import Student from "./components/students";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Why from "./components/recruiters/Why";
import Extra from "./components/recruiters/Extra";
import Achivement from "./components/recruiters/Achivement";
import RecruiterInternship from "./components/recruiters/Internship";
import RecruiterPlacement from "./components/recruiters/Placement";
import Portal from "./components/recruiters/Portal";
import Edit from "./components/students/Edit";
import StudentHome from "./components/students/StudentHome";
import Notification from "./components/students/Notification";

import Resume from "./components/students/Resume";
import StudentPlacement from "./components/students/Placement";

import RecruiterLogin from "./components/recruiters/Login";
import RecruiterHome from "./components/recruiters/RecruiterHome";
import StudentLogin from "./components/students/Login";
import RecruiterRegister from "./components/recruiters/Register";
import Admin from "./components/admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Invitations from "./components/admin/Invitations";
import Students from "./components/admin/Students";
import Recruiters from "./components/admin/Recruiters";
import PlacementRules from "./components/studentDropdown/placementRules";
import PlacementTraining from "./components/studentDropdown/placementTraining";
import Internships from "./components/studentDropdown/internships";
import PlacementExperience from "./components/studentDropdown/placementExperience";
import WhyRecruit from "./components/RecruiterDropDown/whyRecruit";
import Achievements from "./components/RecruiterDropDown/Achievements";
import Policy from "./components/RecruiterDropDown/policy";
import Guide from "./components/RecruiterDropDown/guide";

const App = () => {
    return (
        <Router basename="">
            <Topbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="alumni" element={<Alumni />} />
                <Route path="contact" element={<Contact />} />

                <Route path="/why_recruit?" element={<WhyRecruit />} />
                <Route path="/Achievements" element={<Achievements />} />
                <Route path="/recruiter_policy" element={<Policy/>} />
                <Route path="/recruiter-guide" element={<Guide />} />

                <Route path="recruiter/login" element={<RecruiterLogin />} />
                <Route
                    path="recruiter/register"
                    element={<RecruiterRegister />}
                />

                <Route path="recruiter" element={<Recruiter />}>
                    <Route path="home" element={<RecruiterHome />} />
                    <Route path="extra" element={<Extra />} />
                    <Route path="achievement" element={<Achivement />} />
                    <Route
                        path="internship"
                        element={<RecruiterInternship />}
                    />
                    <Route path="placement" element={<RecruiterPlacement />} />
                    <Route path="why" element={<Why />} />
                    <Route path="portal" element={<Portal />} />
                </Route>

                <Route
                    path="/placement-training"
                    element={<PlacementTraining />}
                />
                <Route
                    path="/placement-rules_&_regulations"
                    element={<PlacementRules />}
                />
                <Route path="/internships" element={<Internships />} />
                <Route
                    path="/placement-experience"
                    element={<PlacementExperience />}
                />

                <Route path="student/login" element={<StudentLogin />} />
                <Route path="student" element={<Student />}>
                    <Route path="home" element={<StudentHome />} />
                    <Route path="edit" element={<Edit />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="placement" element={<StudentPlacement />} />
                    <Route path="resume" element={<Resume />} />
                </Route>
                <Route path="admin" element={<Admin />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="invitations" element={<Invitations />} />
                    <Route path="students" element={<Students />} />
                    <Route path="recruiters" element={<Recruiters />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
