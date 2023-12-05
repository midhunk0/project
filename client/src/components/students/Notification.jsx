/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const NotificationDashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [expandedCardId, setExpandedCardId] = useState(null);

    const toggleFullCard = (notificationId) => {
        setExpandedCardId((prevId) =>
            prevId === notificationId ? null : notificationId
        );
    };

    // const companydata=useFetch()

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

    const handleApply = (id) => {
        // Logic to handle accepting a job opportunity
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
                                    <h4>{notification.company.companyName}</h4>
                                </Card.Subtitle>
                                {expandedCardId === notification._id && (
                                    <>
                                        <Card.Text>
                                            Nature of Business:{" "}
                                            {
                                                notification.company
                                                    .natureOfBusiness
                                            }
                                        </Card.Text>
                                        <p>
                                            Pay Package:{" "}
                                            {notification.company.payPackage}
                                        </p>
                                    </>
                                )}
                            </Col>
                            <Row
                                xs={12}
                                md={4}
                                className="text-md-right mt-3 mt-md-0"
                            >
                                <Button
                                    variant="success"
                                    className="mr-2"
                                    onClick={() =>
                                        handleApply(notification._id)
                                    }
                                >
                                    Apply
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        toggleFullCard(notification._id)
                                    }
                                >
                                    {expandedCardId === notification._id
                                        ? "View Less"
                                        : "View More"}
                                </Button>
                            </Row>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default NotificationDashboard;
