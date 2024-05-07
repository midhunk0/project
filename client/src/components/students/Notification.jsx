// @ts-nocheck
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
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./Notification.css";
import { Notifications } from "@mui/icons-material";
import { baseUrl } from "../../Url";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const { user } = useContext(AuthContext);
  const id = user._id;

  const dataStudent = useFetch(
    `${baseUrl}/api/students/StudentProfile/${id}`
  );
  const student = dataStudent.data;

  const toggleFullCard = (notificationId) => {
    setExpandedCardId((prevId) =>
      prevId === notificationId ? null : notificationId
    );
  };

    // const companydata=useFetch()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/jaf/notification");
        
        const notificationsData = response.data.filter(
          (notification) =>
            notification.isAdminJafSent === true
        );
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApply = async (notificationId) => {
    // Filter notifications to get the selected company's notification object
    const selectedNotification = notifications.find(
      (notification) => notification._id === notificationId
    );

    // Check if selectedNotification exists
    if (!selectedNotification) {
      console.error("Selected notification not found.");
      return;
    }

    const currentUTCDate = new Date().toISOString(); // Get current UTC date and time
    const isDeadlinePassed =
      new Date(selectedNotification.applicationDeadline.value) <=
      new Date(currentUTCDate);

    if (isDeadlinePassed) {
      toast.error("Deadline has passed. You cannot apply to this opportunity.");
      return;
    }

    // Check if student is verified
    if (!student.isVerified) {
      // Display message for not verified
      toast.error("You are not verified. Please contact your faculty.");
      return;
    }

    // Check if student's department is eligible for the selected company
    const isDepartmentEligible =
      Array.isArray(selectedNotification.branchesEligible.values) &&
      selectedNotification.branchesEligible.values.includes(student.department);

    if (!isDepartmentEligible) {
      // Display message for ineligible department
      toast.error("Your department is not eligible for this opportunity.");
      return;
    }

    // Check student's grades and backlogs against notification's cutoff values
    if (
      selectedNotification.tenthGradeCutoff.check &&
      student.tenthGrade < selectedNotification.tenthGradeCutoff.value
    ) {
      toast.error("Your Tenth Grade is lower than the cutoff.");
      return;
    }

    if (
      selectedNotification.twelfthGradeCutoff.check &&
      student.plustwograde < selectedNotification.twelfthGradeCutoff.value
    ) {
      toast.error("Your Twelfth Grade is lower than the cutoff.");
      return;
    }

    if (
      selectedNotification.btechCutoff.check &&
      student.cgpa < selectedNotification.btechCutoff.value
    ) {
      toast.error("Your BTech Grade is lower than the cutoff.");
      return;
    }

    if (
      selectedNotification.maxClearedBacklogs.check &&
      student.clearedBacklogs > selectedNotification.maxClearedBacklogs.value
    ) {
      toast.error("Your cleared backlogs exceed the limit.");
      return;
    }

    if (
      selectedNotification.maxNonClearedBacklogs.check &&
      student.nonClearedBacklogs >
        selectedNotification.maxNonClearedBacklogs.value
    ) {
      toast.error("Your Non-cleared backlogs exceed the limit.");
      return;
    }


   
    try {
      console.log(selectedNotification.recruitmentProcess.values)
      // Send a POST request to create the application
      const response = await axios.post(
        `${baseUrl}/api/application/createApplication`,
        {
          studentId: student._id,
          companyId: selectedNotification.recruiter_id,
          totalStages: selectedNotification.totalRounds.value, 
          recruitmentProcess: selectedNotification.recruitmentProcess.values// Assuming totalRounds corresponds to totalStages
        }
      );

      // Handle successful application creation
      toast.success("Application submitted successfully!");
      // Add logic to update UI or perform other actions
    } catch (error) {
      console.error("Error applying to notification:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
  };

  const keyDisplayMap = {
    applicationDeadline: "Application Deadline",
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

          if (key === "applicationDeadline") {
            const deadlineUtc = new Date(value.value);
            const deadlineLocal = deadlineUtc.toLocaleString(); // Convert to local time format
            displayValue = deadlineLocal;
          }

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
    <Container
      style={{
        backgroundImage: `url(/assets/notification.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Form.Group className="mb-4" style={{ marginTop: "40px" }}>
        <Form.Control
          type="text"
          placeholder="Filter by Company Name"
          value={filterKeyword}
          onChange={handleFilterChange}
        />
      </Form.Group>
      {filteredNotifications.map((notification) => (
        <Card key={notification._id} className="mb-4 notification-card">
          <Card.Body>
            <Row className="align-items-center">
              <Col>
                <Card.Subtitle className="notification">
                  <h4 className="companyname">
                    {notification.companyName.value}
                    {!notification.isStudentRead && <Notifications />}
                  </h4>
                </Card.Subtitle>
                {expandedCardId === notification._id && (
                  <>
                    {renderFields(notification)}
                    <div style={{display:"flex",justifyContent:"space-between"}}>                    
                    <div>
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
                    </div>
                    <div>
                    <Button
                  variant="primary"
                  onClick={() => toggleFullCard(notification._id)}
                >
                  {expandedCardId === notification._id
                    ? "View Less"
                    : "View More"}
                </Button>
                    </div>
                </div>
                  </>
                )}
              </Col>
              {!expandedCardId && 
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
              }
              
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Notification;
