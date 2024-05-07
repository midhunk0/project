import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecruiterMenu.css"; // Make sure to import the CSS file
import { Notifications } from "@mui/icons-material";

const RecruiterMenu = ({ recruiters, onSelectRecruiter }) => {
  const [jafAdminReadMap, setJafAdminReadMap] = useState({});

  useEffect(() => {
    const fetchJafAdminRead = async () => {
      try {
        const jafAdminReads = {};
        for (const recruiter of recruiters) {
          const response = await axios.get(
            `https://project-api-iwiy.onrender.com/api/jaf/jafGet/${recruiter._id}`
          );
          const jaf = response.data;
          jafAdminReads[recruiter._id] = jaf.isAdminRead;
        }
        setJafAdminReadMap(jafAdminReads);
      } catch (error) {
        console.error("Error fetching JAFs:", error);
      }
    };

    if (recruiters && recruiters.length > 0) {
      fetchJafAdminRead();
    }
  }, [recruiters]); // Fetch JAFs when recruiters data changes

  if (!recruiters) {
    return <div>No recruiters found</div>;
  }

  return (
    <div className="recruiterMenu">
      <h2
        style={{
          marginBottom: "30px",
          marginTop: "20px",
          color: "#333",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Recruiters
      </h2>

      <div className="recruiterContainer">
        {recruiters.map((recruiter) => (
          <div key={recruiter._id} onClick={() => onSelectRecruiter(recruiter)}>
            <div className="recruiter">
              <div className="info">
                <p className="companyName">{recruiter.companyName}</p>
                {/* Bell icon */}
                {!jafAdminReadMap[recruiter._id] && <Notifications />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterMenu;
