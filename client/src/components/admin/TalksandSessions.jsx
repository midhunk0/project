import React, { useState } from "react";
import axios from "axios";

const TalksandSessions = () => {
  const [heading, setHeading] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send file along with other form data
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("additionalDetails", additionalDetails);
    formData.append("pdf", file);

    try {
      // Send POST request to backend API endpoint
      await axios.post("/api/seminars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form fields after successful submission
      setHeading("");
      setAdditionalDetails("");
      setFile(null);
      setError("");
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="additionalDetails">Additional Details:</label>
          <textarea
            id="additionalDetails"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pdf">PDF Attachment:</label>
          <input
            type="file"
            id="pdf"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TalksandSessions;
