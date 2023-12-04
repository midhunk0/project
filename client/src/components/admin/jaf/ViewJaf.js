import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewJaf.css";

const ViewJaf = () => {
  const [recruiters, setRecruiters] = useState([]);

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

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            
            <div className="recruiterList">
              <h2>Recruiters</h2>
              <ul>
                {recruiters.map((recruiter) => (
                  <li key={recruiter._id}>{recruiter.companyName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper"></div>
        </div>
      </div>
    </>
  );
};

export default ViewJaf;
