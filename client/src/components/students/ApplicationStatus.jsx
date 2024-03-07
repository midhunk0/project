import React, { useState } from "react";
import "./ApplicationStatus.css"; // Import CSS file for styling

const ApplicationStatus = () => {
  // Define stages and their completion status
  const [stages, setStages] = useState([
    { id: 1, name: "Aptitude", completed: false },
    { id: 2, name: "Group Discussion", completed: false },
    { id: 3, name: "Technical Interview", completed: false },
    { id: 4, name: "HR Interview", completed: false },
  ]);

  // Function to handle stage completion
  const handleStageCompletion = (stageId) => {
    // Mark the clicked stage as completed
    const updatedStages = stages.map((stage) => {
      if (stage.id === stageId) {
        return { ...stage, completed: true };
      }
      return stage;
    });
    // Update the state with the new completion status
    setStages(updatedStages);
  };

  return (
    <div className="application-status">
      <div className="stages">
        {/* Map through stages and render circles */}
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`stage ${stage.completed ? "completed" : ""}`}
            onClick={() => handleStageCompletion(stage.id)}
          >
            {stage.name}
          </div>
        ))}
      </div>
      {/* Render lines between circles */}
      <div className="lines">
        {stages.slice(1).map((_, index) => (
          <div
            key={index}
            className={`line ${stages[index].completed ? "completed" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatus;
