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
import International from "./components/students/International";
import Notification from "./components/students/Notification";
import Preperation from "./components/students/Preperation";
import Skill from "./components/students/Skill";
import StudyCell from "./components/students/StudyCell";
import StudentInternship from "./components/students/Internship";
import StudentPlacement from "./components/students/Placement";
import Invitations from "./pages/Admin/Invitations";
import Students from "./pages/Admin/Students";
import Recruiters from "./pages/Admin/Recruiters";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import RecruiterLogin from "./components/recruiters/Login";
import RecruiterHome from "./components/recruiters/RecruiterHome";
import StudentLogin from "./components/students/Login";
import RecruiterRegister from "./components/recruiters/Register";

const App = () => {
  return (
    <Router basename="">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="contact" element={<Contact />}></Route>
        <Route path="recruiter/login" element={<RecruiterLogin />} />
        <Route path="recruiter/register" element={<RecruiterRegister />} />
        <Route path="recruiter" element={<Recruiter />}>
          <Route path="home" element={<RecruiterHome />} />
          <Route path="extra" element={<Extra />} />
          <Route path="achievement" element={<Achivement />} />
          <Route path="internship" element={<RecruiterInternship />} />
          <Route path="placement" element={<RecruiterPlacement />} />
          <Route path="why" element={<Why />} />
          <Route path="portal" element={<Portal />} />
        </Route>
        <Route path="student/login" element={<StudentLogin />} />
        <Route path="student" element={<Student/>}>
          <Route path="home" element={<StudentHome />} />
          <Route path="edit" element={<Edit />} />
          <Route path="international" element={<International />} />
          <Route path="internship" element={<StudentInternship />} />
          <Route path="notification" element={<Notification />} />
          <Route path="placement" element={<StudentPlacement />} />
          <Route path="preperation" element={<Preperation />} />
          <Route path="skill" element={<Skill />} />
          <Route path="studycell" element={<StudyCell />} />
          <Route path="login" element={<StudentLogin />} />
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
