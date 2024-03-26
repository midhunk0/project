import React, { useState } from "react";
import RecruiterMenu from "./jaf/RecruiterMenu"; // Import the RecruiterMenu component

const MatchedStudents = () => {
    const [currentRound, setCurrentRound] = useState(1);
    const totalRounds = 3; // Assuming there are 3 rounds

    const handleRoundChange = (round) => {
        setCurrentRound(round);
    };

    const renderContent = () => {
        switch (currentRound) {
            case 1:
                return (
                    <div>
                        <h2>Round 1 content </h2>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2>Round 2 Content </h2>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>Round 3 Content</h3>
                    </div>
                );
                
            // Add more cases for additional rounds if needed
            default:
                return null;
        }
    };

    return (
        <div className="matched-students-page" style={matchedStudentsPageStyle}>
            {/* Render the RecruiterMenu component on the left side */}
            <div className="left-panel" style={leftPanelStyle}>
                <RecruiterMenu />
            </div>
            {/* Placeholder for the main content on the right side */}
            <div className="right-panel" style={rightPanelStyle}>
                <div className="top-bar" style={topBarStyle}>
                    {/* Render buttons for each round */}
                    {[...Array(totalRounds)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={
                                currentRound === index + 1 ? "active" : ""
                            }
                            onClick={() => handleRoundChange(index + 1)}
                            style={roundButtonStyle}
                        >
                            Round {index + 1}
                        </button>
                    ))}
                </div>
                <div className="content" style={contentStyle}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// Styles
const matchedStudentsPageStyle = {
    display: "flex",
};

const leftPanelStyle = {
    width: "30%",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const rightPanelStyle = {
    width: "70%",
    padding: "10px",
};

const topBarStyle = {
    display: "flex",
    justifyContent: "space-around", // Adjust spacing between buttons
    marginBottom: "10px",
};

const contentStyle = {
    padding: "10px",
};

const roundButtonStyle = {
    backgroundColor: "#f0f0f0", // Light color for buttons
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
};

export default MatchedStudents;
