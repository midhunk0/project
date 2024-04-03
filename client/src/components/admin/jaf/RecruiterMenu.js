import React from "react";
import "./RecruiterMenu.css"; // Make sure to import the CSS file

const RecruiterMenu = ({ recruiters, onSelectRecruiter }) => {
  if (!recruiters) {
    return <div>No recruiters found</div>;
  }
  return (
    <div className="recruiterMenu">
      <h2
        style={{
          marginBottom: "30px",
          marginTop:"20px",
          color: "#333",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
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
                {/* Add more information if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterMenu;
