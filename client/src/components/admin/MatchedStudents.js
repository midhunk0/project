import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchedStudents = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the list of companies from the backend API
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/recruiters/companies"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by company name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row">
        {filteredCompanies.map((company) => (
          <div className="col-md-12 mb-4" key={company._id}>
            <CompanyRow company={company} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CompanyRow = ({ company }) => {
  const [showStudents, setShowStudents] = useState(false);
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [studid, setStudid] = useState([]);

  const handleViewStudents = async () => {
    // Fetch the matched students for the company from the backend API
    try {
      const response = await axios.get(
        `http://localhost:8080/api/recruiters/companies/${company._id}`
      );
      const studentIds = response.data.matchedStudents[0].studentIds;
      setStudid(studentIds);
      const students = await Promise.all(
        studentIds.map(async (studentId) => {
          const studentResponse = await axios.get(
            `http://localhost:8080/api/recruiters/students/${studentId.studentId}`
          );
          return studentResponse.data;
        })
      );
      setMatchedStudents(students);
      setShowStudents(true);
    } catch (error) {
      console.error("Failed to fetch matched students:", error);
    }
  };

  const handleClose = () => {
    setShowStudents(false);
  };

  const handleSendNotification = async () => {
    try {
      // Iterate over each student ID in the studid array
      for (const studentId of studid) {
        // Send a notification to the student with the current studentId
        await axios.post(
          `http://localhost:8080/api/recruiters/students/${studentId.studentId}/notifications`,
          {
            message: "Your notification message goes here",
            // Add any additional data needed for the notification
          }
        );
      }
      console.log("Notifications sent successfully!");
    } catch (error) {
      console.error("Failed to send notifications:", error);
    }
  };

  return (
    <div className="card custom-card-width" style={{ maxWidth: "100%" }}>
      <div className="card-body">
        <h3 className="card-title">{company.companyName}</h3>
        <p className="card-text">{company.natureOfBusiness}</p>
        {company.payPackage && (
          <p className="card-text">
            Package: {company.payPackage.grossSalary}
          </p>
        )}
        {!showStudents && (
          <button
            className="btn btn-primary"
            onClick={handleViewStudents}
          >
            View Matched Students
          </button>
        )}
        {showStudents && (
          <div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>CGPA</th>
                    <th>Skills</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.username}</td>
                      <td>{student.email}</td>
                      <td>{student.cgpa}</td>
                      <td>{student.skills.join(", ")}</td>
                      <td>{student.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={handleSendNotification}
              >
                Send Notification
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedStudents;
