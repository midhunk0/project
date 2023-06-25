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
import Schedules from "./components/recruiters/Schedules";
import Matched from "./components/recruiters/Matched";
import EditRecruiter from "./components/recruiters/EditRecruiter";
import RecruiterPlacement from "./components/recruiters/Placement";
import Edit from "./components/students/Edit";
import StudentHome from "./components/students/StudentHome";
import Notification from "./components/students/Notification";
import Resume from "./components/students/Resume";
import StudentPlacement from "./components/students/Placement";
import RecruiterLogin from "./components/recruiters/Login";
import Request from "./components/recruiters/Request";
import StudentLogin from "./components/students/Login";
import RecruiterRegister from "./components/recruiters/Register";
import Admin from "./components/admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Invitations from "./components/admin/Invitations";
import Company from "./components/admin/Company";
import Students from "./components/admin/Students";
import MatchedStudents from "./components/admin/MatchedStudents";
import AcceptedStudents from "./components/admin/AcceptedStudents";
import PlacementRules from "./components/studentDropdown/placementRules";
import PlacementTraining from "./components/studentDropdown/placementTraining";
import Internships from "./components/studentDropdown/internships";
import PlacementExperience from "./components/studentDropdown/placementExperience";
import WhyRecruit from "./components/RecruiterDropDown/whyRecruit";
import Achievements from "./components/RecruiterDropDown/Achievements";
import Policy from "./components/RecruiterDropDown/policy";
import Guide from "./components/RecruiterDropDown/guide";
import RecruiterHome from "./components/recruiters/RecruiterHome";

const App = () => {
    return (
        <Router basename="">
            <Topbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="alumni" element={<Alumni />} />
                <Route path="contact" element={<Contact />} />
                <Route path="/why_recruit?" element={<WhyRecruit />} />
                <Route path="/Achievements" element={<Achievements />} />
                <Route path="/recruiter_policy" element={<Policy/>} />
                <Route path="/recruiter-guide" element={<Guide />} />
                <Route path="recruiter/login" element={<RecruiterLogin />} />
                <Route path="recruiter/register" element={<RecruiterRegister />}/>
                <Route path="recruiter" element={<Recruiter />}>
                    <Route path="home" element={<RecruiterHome/>}/>
                    <Route path="request" element={<Request />} />
                    <Route path="schedules" element={<Schedules />} />
                    <Route path="matched" element={<Matched />}/>
                    <Route path="edit" element={<EditRecruiter />}/>
                    <Route path="placement" element={<RecruiterPlacement />} />
                </Route>
                <Route path="/placement-training" element={<PlacementTraining />}/>
                <Route path="/placement-rules_&_regulations" element={<PlacementRules />}/>
                <Route path="/internships" element={<Internships />} />
                <Route path="/placement-experience" element={<PlacementExperience />}/>
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
                    <Route path="matched" element={<MatchedStudents />} />
                    <Route path="accepted" element={<AcceptedStudents />} />
                    <Route path="company" element={<Company />} />
                    <Route path="students" element={<Students />} />
                    
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
