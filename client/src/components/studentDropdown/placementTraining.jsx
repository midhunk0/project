import React from "react";
import { Link } from "react-router-dom";
import "./PlacementTraining.css";

const PlacementTraining = () => {
  return (
    <div className="placement-training-container">
      <h1>Welcome to the training portal!</h1>

      <Link to="/placement-training/sessions" className="square-card">
        <div className="card-content" style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/1476971198/photo/back-view-of-crowd-of-people-raising-hands-on-a-seminar-in-convention-center.webp?b=1&s=170667a&w=0&k=20&c=GncdihWQ1CkiJWIR-I_GSqhbsqUqvG8CgMN8xnj5AIc=")',
        }}>
          <h1 style={{ color: "white" }}>
            Talks <br /> & <br /> Seminars
          </h1>
        </div>
      </Link>

      <Link to="/placement-training/materials" className="square-card">
        <div className="card-content">
          <h1 style={{ color: "white" }}>Materials</h1>
        </div>
      </Link>
    </div>
  );
};

export default PlacementTraining;
