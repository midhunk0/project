import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const NotificationDashboard = () => {
  // Sample job opportunity data
  const jobOpportunities = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'ABC Technologies',
      message: 'We are pleased to offer you a software engineer intern position...',
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'XYZ Corporation',
      message: 'Congratulations! You have been shortlisted for the data analyst position...',
    },
    // Add more job opportunities here...
  ];

  const [notifications, setNotifications] = useState(jobOpportunities);

  const handleAccept = (id) => {
    // Logic to handle accepting a job opportunity
    // Update the notification status or perform any necessary actions
    // For example, you can remove the notification from the list
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const handleReject = (id) => {
    // Logic to handle rejecting a job opportunity
    // Update the notification status or perform any necessary actions
    // For example, you can remove the notification from the list
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <Container>
      <h1>Notification Dashboard</h1>
      {notifications.map((notification) => (
        <Card key={notification.id} className="mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} md={8}>
                <Card.Title>{notification.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{notification.company}</Card.Subtitle>
                <Card.Text>{notification.message}</Card.Text>
              </Col>
              <Col xs={12} md={4} className="text-md-right mt-3 mt-md-0">
                <Button variant="success" className="mr-2" onClick={() => handleAccept(notification.id)}>Accept</Button>
                <Button variant="danger" onClick={() => handleReject(notification.id)}>Reject</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default NotificationDashboard;
