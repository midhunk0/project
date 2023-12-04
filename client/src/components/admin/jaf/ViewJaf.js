import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewJaf.css";
import RecruiterMenu from "./RecruiterMenu";
import Jafform from "./JafForm";

const ViewJaf = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

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

  return (
    <>
      <div className="viewJafContainer">
        
        <RecruiterMenu
          recruiters={recruiters}
          onSelectRecruiter={handleRecruiterSelect}
        />
        {selectedRecruiter && <Jafform recruiter={selectedRecruiter} />}
      </div>
    </>
  );
};

export default ViewJaf;
