import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewJaf.css";
import RecruiterMenu from "./RecruiterMenu";
import Jafform from "./JafForm";

const ViewJaf = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const handleRecruiterSelect = async (recruiter) => {
    // Handle the selected recruiter, e.g., update state
    try {
      // Update the selected recruiter's isAdminRead to true
      console.log(recruiter._id);
      await axios.put(
        `https://project-api-iwiy.onrender.com/api/jaf/updateIsAdminRead/${recruiter._id}`,
        {
          isAdminRead: true,
        }
      );
      setSelectedRecruiter({ ...recruiter, isAdminRead: true });
    } catch (error) {
      console.error("Error updating isAdminRead:", error);
    }
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          "https://project-api-iwiy.onrender.com/api/recruiters/getRecruitersSentJaf"
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
