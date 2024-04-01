import React, { useState, useEffect } from "react";
import axios from "axios";
import RecruiterMenu from "./jaf/RecruiterMenu"; // Import the RecruiterMenu component
import "./studentApplications.css";


const StudentApplications = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [applications, setApplications] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0); // Initialize totalRounds state

  const handleRecruiterSelect = (recruiter) => {
    // Handle the selected recruiter, e.g., update state
    setSelectedRecruiter(recruiter);
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/recruiters/getRecruitersSentJaf"
        );
        setRecruiters(response.data);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
      }
    };

    fetchRecruiters();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      if (selectedRecruiter) {
        try {
          const companyId = selectedRecruiter._id;

          const response = await axios.get(
            `http://localhost:8080/api/application/getApplicationsByRecruiterId/${companyId}`
          );

          setApplications(response.data);
          console.log(response.data.studentDetails);

          setTotalRounds(response.data.applications[0].totalStages + 1); // Set totalRounds from applications data
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
    };

    fetchApplications();
  }, [selectedRecruiter]);

  const handleRoundChange = (round) => {
    setCurrentRound(round);
  };

  const renderContent = () => {
    if (!applications || !applications.studentDetails || applications.studentDetails.length === 0) {
      return <div>No student details available</div>;
    }

    switch (currentRound) {
      case 1:
        return (
          <div>
            <h2>Applied Students</h2>
            
            {applications.studentDetails.length > 0 ? (
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>College ID</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tenth Grade</th>
                    <th>Twelfth Grade</th>
                    <th>CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.studentDetails.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.collegeId}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.tenthGrade}</td>
                      <td>{student.twelfthGrade}</td>
                      <td>{student.cgpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No student details available</div>
            )}
          </div>
        );
      // Render content for other rounds
      default:
        return null;
    }
  };

  return (
    <div className="applicationStatusPage">
      {/* Render the RecruiterMenu component on the left side */}
      <div className="left-panel">
        <RecruiterMenu
          recruiters={recruiters}
          onSelectRecruiter={handleRecruiterSelect}
        />
      </div>
      {/* Placeholder for the main content on the right side */}
      <div className="right-panel">
        <div className="top-bar">
          {/* Render buttons for each round */}
          {[...Array(totalRounds)].map((_, index) => (
            <button
              key={index + 1}
              className={`round-button ${
                currentRound === index + 1 ? "active" : ""
              }`}
              onClick={() => handleRoundChange(index + 1)}
            >
              Round {index}
            </button>
          ))}
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentApplications;
