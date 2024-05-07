// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Modal } from "@mui/material";
import "./Placements.css";
import { baseUrl } from "../../Url";

const Placements = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/recruiters/getAllRecruiters`
        );
        setRecruiters(response.data);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
      }
    };

    fetchRecruiters();
  }, []);

  const fetchApplications = async (recruiterId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/application/getApplicationsByRecruiterId/${recruiterId}`
      );
      const updatedApplications = response.data.applications.map((app) => {
        const matchingStudent = response.data.studentDetails.find(
          (student) => student._id === app.studentId
        );
  
        return {
          ...app,
          studentName: matchingStudent ? matchingStudent.name : "Unknown",
          collegeId: matchingStudent ? matchingStudent.collegeId : "Unknown",
          department: matchingStudent ? matchingStudent.department : "Unknown",
        };
      });
  
      const filteredApplications = updatedApplications.map((app) => ({
        ...app,
        stages: app.stages.filter((stage) => stage.stageNumber !== 0),
      }));
  
      setApplications(filteredApplications);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  

  const handleRecruiterClick = (recruiterId) => {
    setSelectedRecruiter(recruiterId);
    fetchApplications(recruiterId);
  };

  return (
    <div className="placementPage">
      <div className="container-fluid">
        <div className="recruiterName">
          <Typography variant="h2">Recruiters</Typography>
        </div>
        <div className="recruiters-container">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter._id}
              onClick={() => handleRecruiterClick(recruiter._id)}
              className="recruiter-card"
            >
              <h3>{recruiter.companyName}</h3>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal-content">
          {applications.length === 0 ? (
            <Typography>No Applications</Typography>
          ) : (
            <div>
              <div className="applications-heading">
                <Typography variant="h2" className="apphead">
                  Applications
                </Typography>
              </div>
              <div className="applications-list">
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>College ID</th>
                      <th>Department</th>
                      {[...Array(applications[0].totalStages)].map(
                        (_, index) => (
                          <th key={index}>Stage {index + 1}</th>
                        )
                      )}
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application._id}>
                        <td>{application.studentName}</td>
                        <td>{application.collegeId}</td>
                        <td>{application.department}</td>
                        {application.stages.map((stage, index) => (
                          <td key={index}>{stage.status}</td>
                        ))}
                        <td>{application.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Placements;
