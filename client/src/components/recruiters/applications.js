// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./applications.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Applications = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [applications, setApplications] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0); // Initialize totalRounds state
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { user } = useContext(AuthContext);
  const id = user._id;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const companyId = id;

        const response = await axios.get(
          `http://localhost:8080/api/application/getApplicationsByRecruiterId/${companyId}`
        );

        setApplications(response.data);
        console.log(response.data.studentDetails);

        setTotalRounds(response.data.applications[0].totalStages + 1); // Set totalRounds from applications data
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleRoundChange = (round) => {
    setCurrentRound(round);
  };

  const handleCheckboxChange = (collegeId) => {
    const isChecked = selectedStudents.includes(collegeId);

    if (isChecked) {
      setSelectedStudents(selectedStudents.filter((id) => id !== collegeId));
    } else {
      setSelectedStudents([...selectedStudents, collegeId]);
    }
  };

  const handleNextRoundClick = async () => {
    console.log("Selected students for next round:", selectedStudents);

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
          // Increment current stage by 1
          console.log(selectedApplication.currentStage);
          const updatedCurrentStage = selectedApplication.currentStage + 1;
          console.log(updatedCurrentStage);

          // Update the current stage in the application object
          selectedApplication.currentStage = updatedCurrentStage;

          // Update the status of the current stage to "Completed"
          selectedApplication.stages[updatedCurrentStage].status = "Completed";
          console.log(selectedApplication.stages[updatedCurrentStage].status);

          if (
            selectedApplication.currentStage === selectedApplication.totalStages
          ) {
            selectedApplication.status = "Offered";
          }

          try {
            // Update the application in the database
            await axios.put(
              `http://localhost:8080/api/application/updateApplication/${selectedApplication._id}`,
              selectedApplication
            );
            toast.success("Selected to next round");
            console.log(`Updated application for student ${collegeId}`);
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

    // Update statuses of unselected applications to "Rejected"
    const unselectedStudents = applications.studentDetails.filter(
      (student) => !selectedStudents.includes(student.collegeId)
    );

    for (const unselectedStudent of unselectedStudents) {
      const unselectedApplication = applications.applications.find(
        (app) => app.studentId === unselectedStudent._id
      );

      if (unselectedApplication) {
        unselectedApplication.stages[currentRound].status = "Rejected";
        if (currentRound === unselectedApplication.totalStages) {
          unselectedApplication.status = "Rejected";
        }
        console.log(
          `Rejected application for student ${unselectedStudent.collegeId}`
        );

        try {
          // Update the application in the database
          await axios.put(
            `http://localhost:8080/api/application/updateApplication/${unselectedApplication._id}`,
            unselectedApplication
          );
          console.log(
            `Updated application for student ${unselectedStudent.collegeId}`
          );
        } catch (error) {
          console.error(
            `Error updating application for student ${unselectedStudent.collegeId}:`,
            error
          );
        }
      }
    }

    // Reset selectedStudents after processing
    setSelectedStudents([]);
  };

  const renderContent = () => {
    if (
      !applications ||
      !applications.studentDetails ||
      applications.studentDetails.length === 0
    ) {
      return <div>No student details available</div>;
    }

    let displayText = "";
    let filteredStudents = [];

    if (currentRound === 0) {
      displayText = "Applied Students";
      // Filter students for Round 0 based on isAdminVerified field
      filteredStudents = applications.studentDetails.filter((student) => {
        const application = applications.applications.find(
          (app) => app.studentId === student._id
        );
        return application && application.isAdminVerified;
      });
    } else {
      displayText = `Round ${currentRound - 1} Passed`;
      // Filter students for other rounds based on their application status
      filteredStudents = applications.studentDetails.filter((student) => {
        const application = applications.applications.find(
          (app) => app.studentId === student._id
        );
        return (
          application &&
          application.stages[currentRound - 1]?.status === "Completed" &&
          application.isAdminVerified
        );
      });
    }

    return (
      <div>
        <h2>{displayText}</h2>
        <table className="student-table1">
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
        {currentRound !== totalRounds && ( // Render button for all rounds except the last one
          <button className="next-round-button" onClick={handleNextRoundClick}>
            Select to next round
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="applicationStatusPage1">
      <div className="top-bar1">
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
      <div className="content1">{renderContent()}</div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Applications;
