import React, { useState } from "react";
import Modal from "react-modal";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
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
  const [isEditing, setIsEditing] = useState(false);

  const handleVerify = async () => {
    // Call the onVerify function and pass the updated student object with isVerified set to true
    try {
      await onVerify({ ...student, isVerified: true });
      toast.success("Student verified successfully!");
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleEdit = async () => {
    try {
      await onVerify({ ...student, isVerified: false });
      toast.success("Student edit enabled!");
    } catch (error) {
      console.error("Edit action failed:", error);
      toast.error("Failed to enable edit mode. Please try again.");
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
      <Box display="flex" justifyContent="center" alignItems="center" mb="20px">
        {student.profilePicture && (
          <img
            alt="user-profile"
            width="100px"
            height="100px"
            src={student.profilePicture}
            style={{
              cursor: "pointer",
              borderRadius: "10%",
              margin: "10px",
            }}
          />
        )}
      </Box>
      <table style={{ width: "100%" }} border={1} mb="20px">
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
              <strong>Semester:</strong>
            </td>
            <td>{student.semester}</td>
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
              <strong>Faculty Email:</strong>
            </td>
            <td>{student.facultyEmail}</td>
          </tr>
          <tr>
            <td>
              <strong>Blood Group:</strong>
            </td>
            <td>{student.bloodGroup}</td>
          </tr>
          <tr>
            <td>
              <strong>Aadhaar:</strong>
            </td>
            <td>{student.aadhaar}</td>
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
              <strong>Domicile State:</strong>
            </td>
            <td>{student.domicileState}</td>
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
              <strong>Tenth Grade:</strong>
            </td>
            <td>{student.tenthgrade}</td>
          </tr>
          <tr>
            <td>
              <strong>Plus Two Grade:</strong>
            </td>
            <td>{student.plustwograde}</td>
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
              <strong>Cleared Backlogs:</strong>
            </td>
            <td>{student.clearedBacklogs}</td>
          </tr>
          <tr>
            <td>
              <strong>Non Cleared Backlogs:</strong>
            </td>
            <td>{student.nonclearedBacklogs}</td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={student.isVerified}
        >
          Verify
        </button>
        <button
          className="edit-button"
          onClick={handleEdit}
          disabled={!student.isVerified}
        >
          Edit
        </button>
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
      <Toaster position="top-center" />
    </Modal>
  );
};

export default StudentProfileModal;
