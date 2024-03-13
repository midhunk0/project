// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [expandedCardId, setExpandedCardId] = useState(null);
//   const [filterKeyword, setFilterKeyword] = useState("");

//   const toggleFullCard = (notificationId) => {
//     setExpandedCardId((prevId) =>
//       prevId === notificationId ? null : notificationId
//     );
//   };

//   useEffect(() => {
//     // Simulating fetching notifications from an API
//     const fetchNotifications = () => {
//       // Sample data for notifications
//       const notificationsData = [
//         {
//           _id: 1,
//           isNotification: true,
//           company: {
//             companyName: "Bosch",
//             natureOfBusiness: "IT",
//             designation: "SDE intern",
//           },
//         },
//         {
//           _id: 2,
//           isNotification: true,
//           company: {
//             companyName: "Key Value Solutions",
//             natureOfBusiness: "Finance",
//             payPackage: "80,000",
//           },
//         },
//       ];

//       // Filter notifications where isNotification is true
//       const filteredNotifications = notificationsData.filter(
//         (notification) => notification.isNotification
//       );

//       setNotifications(filteredNotifications);
//     };

//     fetchNotifications();
//   }, []);

//   const handleApply = (id) => {
//     // Implement your apply logic here
//     console.log("Applied for notification with id:", id);
//   };

//   const handleFilterChange = (e) => {
//     setFilterKeyword(e.target.value);
//   };

//   const filteredNotifications = notifications.filter((notification) =>
//     notification.company.companyName.toLowerCase().includes(filterKeyword.toLowerCase())
//   );

//   return (
//     <Container>
//       <h1 className="mb-4">Notification Dashboard</h1>
//       <Form.Group className="mb-4">
//         <Form.Control
//           type="text"
//           placeholder="Filter by Company Name"
//           value={filterKeyword}
//           onChange={handleFilterChange}
//         />
//       </Form.Group>
//       {filteredNotifications.map((notification) => (
//         <Card key={notification._id} className="mb-4">
//           <Card.Body>
//             <Row className="align-items-center">
//               <Col>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   <h4>{notification.company.companyName}</h4>
//                 </Card.Subtitle>
//                 {expandedCardId === notification._id && (
//                   <>
//                     <Card.Text>
//                       Nature of Business: {notification.company.natureOfBusiness}
//                     </Card.Text>
//                     <Card.Text>
//                       Designation: {notification.company.designation}
//                     </Card.Text>
//                     <Card.Text>
//                       Pay Package: {notification.company.payPackage}
//                     </Card.Text>
//                     <Button
//                       variant="success"
//                       className="mr-2"
//                       onClick={() => handleApply(notification._id)}
//                     >
//                       Apply
//                     </Button>
//                   </>
//                 )}
//               </Col>
//               <Col xs="auto">
//                 <Button
//                   variant="primary"
//                   onClick={() => toggleFullCard(notification._id)}
//                 >
//                   {expandedCardId === notification._id ? "View Less" : "View More"}
//                 </Button>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       ))}
//     </Container>
//   );
// };

// export default Notification;
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

  const filteredNotifications = notifications.filter((notification) =>
    notification.companyName.value.toLowerCase().includes(filterKeyword.toLowerCase())
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
                    <Card.Text>
                      Nature of Business: {notification.natureOfBusiness.value}
                    </Card.Text>
                    <Card.Text>
                      Designation: {notification.designation.value}
                    </Card.Text>
                    <Card.Text>
                      Pay Package: {notification.payPackage.grossSalary.value}
                    </Card.Text>
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => handleApply(notification._id)}
                    >
                      Apply
                    </Button>
                  </>
                )}
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  onClick={() => toggleFullCard(notification._id)}
                >
                  {expandedCardId === notification._id ? "View Less" : "View More"}
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
