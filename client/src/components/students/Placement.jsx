import React from "react";
import { Container, Table, Card } from "react-bootstrap";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const PlacementHistoryPage = () => {
  const currentPlacement = {
    company: "ABC Technologies",
    jobTitle: "Software Engineer",
    placementDate: "2022-06-01",
    salary: "$80,000",
  };

  const cardStyle = {
    transition: "transform 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
  };

  const placementHistory = [
    {
      id: 1,
      company: "ABC Technologies",
      jobTitle: "Software Engineer",
      placementDate: "2021-01-15",
      salary: "$80,000",
    },
    {
      id: 2,
      company: "XYZ Corporation",
      jobTitle: "Data Analyst",
      placementDate: "2022-03-05",
      salary: "$65,000",
    },
    {
      id: 3,
      company: "Company C",
      jobTitle: "Job C",
      placementDate: "2022-07-22",
      salary: "$55,000",
    },
    {
      id: 4,
      company: "Company D",
      jobTitle: "Job D",
      placementDate: "2023-02-10",
      salary: "$70,000",
    },
    {
      id: 5,
      company: "Company E",
      jobTitle: "Job E",
      placementDate: "2023-05-20",
      salary: "$60,000",
    },
  ];

  placementHistory.sort(
    (a, b) => new Date(b.placementDate) - new Date(a.placementDate)
  );

  return (
    <Container>
      <h1>Current Placement</h1>
      <br></br>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">
            {currentPlacement.company}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {currentPlacement.jobTitle}
          </Card.Subtitle>
          <Card.Text>
            <strong>Placement Date:</strong> {currentPlacement.placementDate}
            <br />
            <strong>Salary:</strong> {currentPlacement.salary}
          </Card.Text>
          <div>
            <FontAwesomeIcon
              icon={faAward}
              className="text-warning"
              size="2x"
            />
          </div>
        </Card.Body>
      </Card>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        gravity={0.1}
        friction={0.99}
        initialVelocityX={-2}
        initialVelocityY={5}
        recycle={false}
      />
      <h1 className="mt-5">Placement History</h1>
      <br></br>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Placement Date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {placementHistory.map((placement, index) => (
            <tr key={placement.id}>
              <td>{index + 1}</td>
              <td>{placement.company}</td>
              <td>{placement.jobTitle}</td>
              <td>{placement.placementDate}</td>
              <td>{placement.salary}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PlacementHistoryPage;
