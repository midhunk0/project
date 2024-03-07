// AppliedCompanies.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const AppliedCompanies = () => {
  const [appliedCompanies, setAppliedCompanies] = useState([
    { id: 1, name: 'Company A', status: 'Pending' },
    { id: 2, name: 'Company B', status: 'Accepted' },
    // Add more applied companies here
  ]);

  return (
    <div className="p-4"> {/* Add padding around the cards */}
      <h2 className="mb-4">Applied Companies</h2>
      <div className="card-container">
        {appliedCompanies.map(company => (
          <Card key={company.id} className="mb-3">
            <Card.Body>
              <Card.Title>{company.name}</Card.Title>
              <Card.Text>Status: {company.status}</Card.Text>
              <Link to={`/application-status/${company.id}`}>
                <Button variant="primary">View Application Status</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppliedCompanies;
