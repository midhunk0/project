import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./AppliedCompanies.css";

const AppliedCompanies = ({ studentId }) => {
  const [applications, setApplications] = useState([]);
  const [recruiterDetails, setRecruiterDetails] = useState([]);

  const { user } = useContext(AuthContext);
  const id = user._id;

  useEffect(() => {
    const fetchApplications = async () => {
      const studentId = id;
      console.log(studentId);
      try {
        const response = await axios.get(
          `https://project-api-iwiy.onrender.com/api/application/getApplicationsByStudentId/${studentId}`
        );

        setApplications(response.data.applications);

        // Fetch recruiter details for each companyId
        const companyIdArray = response.data.applications.map(
          (app) => app.companyId
        );

        // Assuming you have an API endpoint that accepts an array of company IDs
        const recruiterResponse = await axios.post(
          `https://project-api-iwiy.onrender.com/api/recruiters/getRecruitersByCompanyIds`,
          { companyIds: companyIdArray }
        );

        setRecruiterDetails(recruiterResponse.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "in-progress";
      case "Rejected":
        return "rejected"; // Assuming "Rejected" maps to "pending" class in your CSS
      default:
        return "gray";
    }
  };

  const getRecruiterName = (companyId) => {
    // Check if recruiterDetails is an array and has data
    if (Array.isArray(recruiterDetails) && recruiterDetails.length > 0) {
      const recruiter = recruiterDetails.find(
        (recruiter) => recruiter._id === companyId
      );
      if (recruiter) {
        return recruiter.companyName;
      }
    }
    return "Recruiter not found"; // Return default if recruiterDetails is empty or companyId is not found
  };

  return (
    <div
      className="applied-companies-container"
      style={{
        backgroundImage: `url(/assets/appliedCompanies.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {applications.map((application) => (
        <div key={application._id} className="application-card">
          {/* Fetch company name from recruiterDetails array */}
          <h3>{getRecruiterName(application.companyId)}</h3>
          <p>Status: {application.status}</p>
          <div className="timeline">
            {Array(application.totalStages + 1)
              .fill(null)
              .map((_, roundIndex) => (
                <React.Fragment key={roundIndex}>
                  <div className="timeline-item">
                    <div
                      className={`timeline-spot ${getStatusColor(
                        application.stages[roundIndex]?.status
                      )}`}
                    >
                      {roundIndex}
                    </div>
                    <div className="stage-name">
                      {application.stages[roundIndex]?.stageName ||
                        `Stage ${roundIndex}`}
                    </div>
                  </div>
                  {roundIndex < application.totalStages && (
                    <div className="timeline-line"></div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppliedCompanies;
