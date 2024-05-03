import React, { useContext } from "react";
import "./App.css";
import Footer from "./components/global/footer";
import Topbar from "./components/global/Topbar";
import Home from "./components/home";
import Alumni from "./components/alumni";
import Contact from "./components/contact";
import Recruiter from "./components/recruiters";
import Student from "./components/students";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Schedules from "./components/recruiters/Schedules";
import EditRecruiter from "./components/recruiters/EditRecruiter";
import RecruiterPlacement from "./components/recruiters/Placement";
import Edit from "./components/students/Edit";
import StudentHome from "./components/students/StudentHome";
import Notification from "./components/students/Notification";
import StudentForgotPassword from "./components/students/forgotPassword.jsx";
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
import AcceptedStudents from "./components/admin/AcceptedStudents";
import PlacementRules from "./components/studentDropdown/placementRules";
import Internships from "./components/studentDropdown/internships";
import PlacementExperience from "./components/studentDropdown/placementExperience";
import WhyRecruit from "./components/RecruiterDropDown/whyRecruit";
import Achievements from "./components/RecruiterDropDown/Achievements";
import Policy from "./components/RecruiterDropDown/policy";
import Guide from "./components/RecruiterDropDown/guide";
import RecruiterHome from "./components/recruiters/RecruiterHome";
import Jointform from "./components/recruiters/Jointform";
import AdminMessenger from "./components/admin/chat/AdminMessenger";
import ViewJaf from "./components/admin/jaf/ViewJaf";
import RecruiterMessenger from "./components/recruiters/chat/RecruiterMessenger";
import Faculty from "./components/faculty";
import FacultyLogin from "./components/faculty/Login";
import FacultyHome from "./components/faculty/FacultyHome";
import FacultyEdit from "./components/faculty/FacultyEdit";
import FacultyRegister from "./components/faculty/Register";
import Materials from "./components/studentDropdown/Materials";
import StudentCredits from "./components/faculty/StudentCredits";
import AppliedCompanies from "./components/students/AppliedCompanies";
import ApplicationStatus from "./components/students/ApplicationStatus";
import StudentApplications from "./components/admin/studentApplications.js";
import Applications from "./components/recruiters/applications.js";
import Training from "./components/admin/Training.jsx";
import UpdatePassword from "./components/students/UpdatePassword.jsx";
import FacultyForgotPassword from "./components/faculty/forgotPassword.jsx";
import Placements from "./components/admin/Placements.jsx";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext); // Get the user object from AuthContext

  // Define a function to check if the user is logged in
  const isLoggedIn = () => {
    return !!user; // Assuming your user object has a property indicating login status
  };
  return (
    <Router basename="">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/why_recruit?" element={<WhyRecruit />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/recruiter_policy" element={<Policy />} />
        <Route path="/recruiter-guide" element={<Guide />} />
        <Route path="recruiter/login" element={<RecruiterLogin />} />
        <Route path="recruiter/register" element={<RecruiterRegister />} />
        {isLoggedIn() ? (
          <>
            <Route path="/recruiter" element={<Recruiter />}>
              {/* Define recruiter sub-routes here */}
              <Route path="home" element={<RecruiterHome />} />
              <Route path="request" element={<Request />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="Applications" element={<Applications />} />
              <Route path="edit" element={<EditRecruiter />} />
              <Route path="placement" element={<RecruiterPlacement />} />
              <Route path="chat" element={<RecruiterMessenger />} />
              <Route path="form" element={<Jointform />} />
            </Route>
            <Route path="/faculty" element={<Faculty />}>
              {/* Define faculty sub-routes here */}
              <Route path="home" element={<FacultyHome />} />
              <Route path="studentcredits" element={<StudentCredits />} />
              <Route path="edit" element={<FacultyEdit />} />
            </Route>
            <Route path="/student" element={<Student />}>
              {/* Define student sub-routes here */}
              <Route path="home" element={<StudentHome />} />
              <Route path="edit" element={<Edit />} />
              <Route path="notification" element={<Notification />} />
              <Route path="appliedCompanies" element={<AppliedCompanies />} />
              <Route path="applicationStatus" element={<ApplicationStatus />} />
              <Route path="placement" element={<StudentPlacement />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
              {/* Define admin sub-routes here */}
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="placements" element={<Placements />} />
              <Route path="invitations" element={<Invitations />} />
              <Route path="students" element={<Students />} />
              <Route
                path="studentApplications"
                element={<StudentApplications />}
              />
              <Route path="accepted" element={<AcceptedStudents />} />
              <Route path="company" element={<Company />} />
              <Route path="students" element={<Students />} />
              <Route path="chat" element={<AdminMessenger />} />
              <Route path="viewjaf" element={<ViewJaf />} />
              <Route path="training" element={<Training />} />
            </Route>
          </>
        ) : (
          // Redirect to home page if not logged in and trying to access private routes
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        <Route path="faculty/login" element={<FacultyLogin />} />
        <Route path="faculty/register" element={<FacultyRegister />} />
        <Route path="placement-training" element={<Materials />} />
        <Route
          path="/placement-rules_&_regulations"
          element={<PlacementRules />}
        />
        <Route path="/internships" element={<Internships />} />
        <Route path="/placement-experience" element={<PlacementExperience />} />
        <Route path="student/login" element={<StudentLogin />} />
        <Route
          path="/student/forgot-password"
          element={<StudentForgotPassword />}
        />
        <Route
          path="/faculty/forgot-password"
          element={<FacultyForgotPassword />}
        />
        <Route path="update-password" element={<UpdatePassword />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
