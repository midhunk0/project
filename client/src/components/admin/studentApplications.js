// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import RecruiterMenu from "./jaf/RecruiterMenu"; // Import the RecruiterMenu component
import "./studentApplications.css";

const StudentApplications = () => {
  const [selectedRound, setSelectedRound] = useState(0); // Initialize selectedRound state
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [applications, setApplications] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0); // Initialize totalRounds state
  const [selectedStudents, setSelectedStudents] = useState([]); // Initialize selectedStudents state

  const handleRecruiterSelect = async (recruiter) => {
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

  const handleRoundChange = (roundIndex) => {
    setSelectedRound(roundIndex);
  };

  const handleCheckboxChange = (collegeId) => {
    const isChecked = selectedStudents.includes(collegeId);

    if (isChecked) {
      setSelectedStudents(selectedStudents.filter((id) => id !== collegeId));
    } else {
      setSelectedStudents([...selectedStudents, collegeId]);
    }
  };

  const handleSendToRecruiter = async () => {
    for (const collegeId of selectedStudents) {
      // Find the application for the current student
      const selectedStudent = applications.studentDetails.find(
        (student) => student.collegeId === collegeId
      );
      console.log(selectedStudent._id);

      if (selectedStudent) {
        // Find the application for this student in the applications array
        const selectedApplication = applications.applications.find(
          (app) => app.studentId === selectedStudent._id
        );

        if (selectedApplication) {
          selectedApplication.isAdminVerified = true;

          try {
            // Update the application in the database
            await axios.put(
              `http://localhost:8080/api/application/updateIsAdminVerified/${selectedApplication._id}`,
              selectedApplication
            );

            console.log(`Updated application for student ${collegeId}`);
            toast.success("Selected to next round");
          } catch (error) {
            toast.error("Error updating!");

            console.error(
              `Error updating application for student ${collegeId}:`,
              error
            );
          }
        }
      }
    }
  };

  const renderContent = () => {
    if (
      !applications ||
      !applications.studentDetails ||
      applications.studentDetails.length === 0
    ) {
      return <div>No student details available</div>;
    }

    const filteredStudents = applications.studentDetails.filter((student) => {
      const application = applications.applications.find(
        (app) => app.studentId === student._id
      );
      return (
        application && application.stages[selectedRound]?.status === "Completed"
      );
    });

    return (
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#3f51b5",
            marginBottom: "20px",
          }}
        >
          Round {selectedRound} Passed
        </h2>

        <table className="student-table">
          <thead>
            <tr>
              <th>Select</th>
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
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.collegeId)}
                    onChange={() => handleCheckboxChange(student.collegeId)}
                  />
                </td>
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
        {selectedRound === 0 && (
          <button
            className="send-to-recruiter-button"
            onClick={handleSendToRecruiter}
          >
            Send to recruiter
          </button>
        )}
      </div>
    );
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
              key={index}
              className={`round-button ${
                selectedRound === index ? "active" : ""
              }`}
              onClick={() => handleRoundChange(index)}
            >
              Round {index}
            </button>
          ))}
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default StudentApplications;
