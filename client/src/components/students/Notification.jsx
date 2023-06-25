import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const NotificationDashboard = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Simulating fetching notifications from an API
        const fetchNotifications = () => {
            // Sample data for notifications
            const notificationsData = [
                {
                    _id: 1,
                    isNotification: true,
                    company: {
                        companyName: "Company A",
                        natureOfBusiness: "Technology",
                        payPackage: "100,000",
                    },
                },
                {
                    _id: 2,
                    isNotification: true,
                    company: {
                        companyName: "Company B",
                        natureOfBusiness: "Finance",
                        payPackage: "80,000",
                    },
                },
                {
                    _id: 3,
                    isNotification: true,
                    company: {
                        companyName: "Company C",
                        natureOfBusiness: "Marketing",
                        payPackage: "90,000",
                    },
                },
            ];

            // Filter notifications where isNotification is true
            const filteredNotifications = notificationsData.filter(
                (notification) => notification.isNotification
            );

            setNotifications(filteredNotifications);
        };

        fetchNotifications();
    }, []);

    const handleAccept = (id) => {
        // Logic to handle accepting a job opportunity
        // Update the notification status or perform any necessary actions
        // For example, you can remove the notification from the list
        const updatedNotifications = notifications.filter(
            (notification) => notification._id !== id
        );
        setNotifications(updatedNotifications);
    };

    const handleReject = (id) => {
        // Logic to handle rejecting a job opportunity
        // Update the notification status or perform any necessary actions
        // For example, you can remove the notification from the list
        const updatedNotifications = notifications.filter(
            (notification) => notification._id !== id
        );
        setNotifications(updatedNotifications);
    };

    return (
        <Container>
            <h1>Notification Dashboard</h1>
            {notifications.map((notification) => (
                <Card key={notification._id} className="mb-4">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs={12} md={8}>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {notification.company.companyName}
                                </Card.Subtitle>
                                <Card.Text>
                                    Nature of Business:{" "}
                                    {notification.company.natureOfBusiness}
                                </Card.Text>
                                <p>
                                    Pay Package:{" "}
                                    {notification.company.payPackage}
                                </p>
                            </Col>
                            <Col
                                xs={12}
                                md={4}
                                className="text-md-right mt-3 mt-md-0"
                            >
                                <Button
                                    variant="success"
                                    className="mr-2"
                                    onClick={() =>
                                        handleAccept(notification._id)
                                    }
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        handleReject(notification._id)
                                    }
                                >
                                    Reject
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default NotificationDashboard;
