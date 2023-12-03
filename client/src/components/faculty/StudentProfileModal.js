import React, { useState } from "react";
import Modal from "react-modal";

import "./StudentProfileModal.css";

const customStyles = {
    overlay: {
        zIndex: 1000, // Adjust as needed
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
        zIndex: 1001, // Adjust as needed
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
    },
};

const StudentProfileModal = ({
    isOpen,
    onClose,
    student,
    onVerify,
    onSubmit,
}) => {
    const [isToggled, setToggled] = useState(false);

    const handleToggle = async () => {
        setToggled(!isToggled);
        try {
            // Perform verification process here based on isToggled
            if (isToggled) {
                // Update isVerified to true
                student.isVerified = false;
            } else {
                // Update isVerified to false
                student.isVerified = true;
            }

            // Call the onVerify function and pass the updated student object
            await onVerify(student);
        } catch (error) {
            console.error("Verification failed:", error);
            // Handle error, show message, etc.
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Student Profile Modal"
            style={customStyles}
        >
            <h2 style={{ textAlign: "center" }}>{student.username} Profile</h2>
            <hr></hr>
            <table style={{ width: "100%" }} border={1}>
                <tbody>
                    <tr>
                        <td>
                            <strong>Username:</strong>
                        </td>
                        <td>{student.username}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Email:</strong>
                        </td>
                        <td>{student.email}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Student College ID:</strong>
                        </td>
                        <td>{student.studentCollegeID}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Gender:</strong>
                        </td>
                        <td>{student.gender}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Date of Birth:</strong>
                        </td>
                        <td>{student.dob}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Faculty:</strong>
                        </td>
                        <td>{student.faculty}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Blood Group:</strong>
                        </td>
                        <td>{student.bloodGroup}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Aadhar:</strong>
                        </td>
                        <td>{student.aadhar}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Phone:</strong>
                        </td>
                        <td>{student.phone}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Address:</strong>
                        </td>
                        <td>{student.address}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Nationality:</strong>
                        </td>
                        <td>{student.nationality}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Religion:</strong>
                        </td>
                        <td>{student.religion}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Category:</strong>
                        </td>
                        <td>{student.category}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Mother Tongue:</strong>
                        </td>
                        <td>{student.motherTongue}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Plus 2:</strong>
                        </td>
                        <td>{student.plus2}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Rank:</strong>
                        </td>
                        <td>{student.rank}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Admission Quota:</strong>
                        </td>
                        <td>{student.admissionQouta}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Admission Number:</strong>
                        </td>
                        <td>{student.admissionNumber}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Admitted Scheme:</strong>
                        </td>
                        <td>{student.admittedScheme}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Admitted Program:</strong>
                        </td>
                        <td>{student.admittedProgram}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Department:</strong>
                        </td>
                        <td>{student.department}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Admitted Type:</strong>
                        </td>
                        <td>{student.admittedType}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>CGPA:</strong>
                        </td>
                        <td>{student.cgpa}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Skills:</strong>
                        </td>
                        <td>{student.skills.join(", ")}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Backlogs:</strong>
                        </td>
                        <td>{student.backlogs}</td>
                    </tr>
                    {/* <tr>
            <td>
              <strong>Profile Picture:</strong>
            </td>
            <td>{student.profilePicture}</td>
          </tr>
          <tr>
            <td>
              <strong>CV:</strong>
            </td>
            <td>{student.cv}</td>
          </tr> */}
                </tbody>
            </table>
            <div className="toggle-container">
                <button
                    className={`toggle-button ${
                        isToggled ? "toggle-verified" : "toggle-edit-enabled"
                    }`}
                    onClick={handleToggle}
                >
                    {isToggled ? "Verified" : "Edit enabled"}
                </button>
                <p>
                    Click to:{" "}
                    {isToggled ? "Enable Student Edit!" : "Verify Student!"}
                </p>
            </div>
            <button
                onClick={onClose}
                style={{
                    width: "70px",
                    height: "40px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "red",
                    color: "white",
                    margin: "20px",
                }}
            >
                Close
            </button>
        </Modal>
    );
};

export default StudentProfileModal;
