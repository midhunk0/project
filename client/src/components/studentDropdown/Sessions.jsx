import React from 'react'
import { Link } from "react-router-dom";
import "./Sessions.css"

const Sessions = () => {
  return (
    <div>
      <h1 style={{textAlign:"center", padding:"30px"}}>Choose Semester!</h1>
      <div className='semcontainer'>
      <Link to="/placement-training/sessions" className="square-card1">
        <div className="card-content" >
          <h1 style={{ color: "white" }}>
            S2
          </h1>
        </div>
      </Link>

      <Link to="/placement-training/materials" className="square-card1">
        <div className="card-content">
          <h1 style={{ color: "white" }}>S3</h1>
        </div>
      </Link>

      <Link to="/placement-training/materials" className="square-card1">
        <div className="card-content">
          <h1 style={{ color: "white" }}>S4</h1>
        </div>
      </Link>

      <Link to="/placement-training/materials" className="square-card1">
        <div className="card-content">
          <h1 style={{ color: "white" }}>S5</h1>
        </div>
      </Link>

      <Link to="/placement-training/materials" className="square-card1">
        <div className="card-content">
          <h1 style={{ color: "white" }}>S6</h1>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default Sessions