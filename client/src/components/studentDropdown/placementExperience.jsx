import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const PlacementExperience = () => {
  const experiences = [
    {
      company: "Google",
      name: "Manjunath",
      role: "Software Engineer",
      duration: "May 2022 - Present",
      description:
        "Worked on developing web applications and implementing new features.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },
    {
      name: "Akshay",
      company: "Texas Instruments",
      role: "Intern",
      duration: "January 2022 - April 2022",
      description: "Assisted in testing and debugging software products.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },
    {
      name: "Midhun",
      company: "Amadeus",
      role: "Software Enginner",
      duration: "January 2022 - Present",
      description: "Assisted in testing and debugging software products.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },
    {
      name: "Kuttan",
      company: "Key value Solutions",
      role: "Software Engineer",
      duration: "May 2023 - Present",
      description:
        "Worked on developing web applications and implementing new features.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },
    {
      name: "Chikku",
      company: "Open Fintech",
      role: "Software Engineer",
      duration: "May 2022 - Present",
      description:
        "Worked on developing web applications and implementing new features.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },
    {
      name: "Aju",
      company: "Oracle",
      role: "Intern",
      duration: "January 2022 - April 2022",
      description: "Assisted in testing and debugging software products.",
      linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
      instagram: "https://www.instagram.com/your-instagram-id",
    },

    // Add more experience objects as needed
  ];

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setExpandedIndex(null); // Reset the expanded index when a company is clicked
  };

  const handleExpandToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter experiences based on selected company
  const filteredExperiences = selectedCompany
    ? experiences.filter((experience) => experience.company === selectedCompany)
    : experiences;

  return (
    <section id="placement-experience" className="py-5 bg-light">
      <Container>
        <h2
          className="text-center mb-4"
          style={{ fontSize: "50px", color: "#20313e", fontWeight: "bold" }}
        >
          Placement Experience
        </h2>
        <h4 className="text-center mb-4">Experience matters...</h4>
        <hr></hr>
        <br></br>
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item action onClick={() => handleCompanyClick(null)}>
                All Companies
              </ListGroup.Item>
              {experiences.map((experience, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleCompanyClick(experience.company)}
                >
                  {experience.company}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={9}>
            {filteredExperiences.map((experience, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    {experience.name} - {experience.company}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {experience.role}
                  </Card.Subtitle>
                  <Card.Text>{experience.duration}</Card.Text>
                  {expandedIndex === index ? (
                    <>
                      <Card.Text>{experience.description}</Card.Text>
                      <div className="mb-2">
                        <a
                          href={experience.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                      <div>
                        <a
                          href={experience.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram ID
                        </a>
                      </div>
                      <a href="#" onClick={() => handleExpandToggle(index)}>
                        Read Less
                      </a>
                    </>
                  ) : (
                    <a href="#" onClick={() => handleExpandToggle(index)}>
                      Read More
                    </a>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PlacementExperience;
