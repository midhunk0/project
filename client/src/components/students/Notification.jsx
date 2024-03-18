//student notification from admin
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");

  const toggleFullCard = (notificationId) => {
    setExpandedCardId((prevId) =>
      prevId === notificationId ? null : notificationId
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/jaf/notification");
        const notificationsData = response.data.filter(
          (notification) => notification.isAdminJafSent === true
        );
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApply = (id) => {
    console.log("Applied for notification with id:", id);
    // Implement your apply logic here
  };

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
  };

  const keyDisplayMap = {
    tenthGradeCutoff: "Tenth Grade Cutoff",
    twelfthGradeCutoff: "Twelfth Grade Cutoff",
    btechCutoff: "B.Tech Cutoff",
    maxClearedBacklogs: "Max Cleared Backlogs",
    maxNonClearedBacklogs: "Max Non-Cleared Backlogs",
    natureOfBusiness: "Nature of Buisiness",
    category: "Category",
    fax: "Fax",
    contactPerson: "Contact Person",
    designation: "Designation",
    homePage: "Home Page",
    telephoneNo: "Telephone No.",
    email: "E-mail",
    jobDescription: "Job Description",
    address: "Address",
    branchesEligible: "Branches Eligible",
    recruitmentProcess: "Recruitment Process",
    grossSalary: "Gross Salary",
    bond: "Bond",
    bondYears: "Bond Years",
    recruitmentTechnique: "Recruitment Technique",
    preferredDates: "Preferred Dates",
    totalRounds: "Total Rounds",
    nb: "Note",
  };

  const renderFields = (notification) => {
    return Object.entries(notification).map(([key, value]) => {
      if (key !== "_id" && key !== "isAdminJafSent" && key !== "companyName") {
        if (value.check) {
          const displayKey = keyDisplayMap[key] || key;
          let displayValue = value.value; // Default display value is "value"

          // Check if the field is branchesEligible or recruitmentProcess and handle multiple values
          if (key === "branchesEligible" || key === "recruitmentProcess") {
            displayValue = value.values.join(", "); // Join array values with a comma
          }

          return (
            <Card.Text key={key}>
              <b>{displayKey}:</b> {displayValue}
            </Card.Text>
          );
        }
      }
      return null;
    });
  };

  const cancelJaf = async (id) => {
    console.log("Cancelled notification with id:", id);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.companyName.value
      .toLowerCase()
      .includes(filterKeyword.toLowerCase())
  );

  return (
    <Container>
      <h1 className="mb-4">Notification Dashboard</h1>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Filter by Company Name"
          value={filterKeyword}
          onChange={handleFilterChange}
        />
      </Form.Group>
      {filteredNotifications.map((notification) => (
        <Card key={notification._id} className="mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col>
                <Card.Subtitle className="mb-2 text-muted">
                  <h4>{notification.companyName.value}</h4>
                </Card.Subtitle>

                {expandedCardId === notification._id && (
                  <>
                    {renderFields(notification)}
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => handleApply(notification._id)}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="danger"
                      className="mr-2"
                      onClick={() => cancelJaf(notification._id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  onClick={() => toggleFullCard(notification._id)}
                >
                  {expandedCardId === notification._id
                    ? "View Less"
                    : "View More"}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Notification;
