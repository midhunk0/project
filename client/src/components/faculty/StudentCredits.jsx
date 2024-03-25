

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import StudentProfileModal from "./StudentProfileModal";

const StudentCredits = () => {
    const { user } = useContext(AuthContext);
    const facultymail = user.email;

    const facName = user.username;
    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const changeCredit = async (student, semester) => {
        try {
            const updatedStudent = { ...student }; // Create a copy of the student object
            switch (semester) {
                case 1:
                    updatedStudent.creditss1 += 5;
                    break;
                case 2:
                    updatedStudent.creditss2 += 5;
                    break;
                case 3:
                    updatedStudent.creditss3 += 5;
                    break;
                case 4:
                    updatedStudent.creditss4 += 5;
                    break;
                case 5:
                    updatedStudent.creditss5 += 5;
                    break;
                case 6:
                    updatedStudent.creditss6 += 5;
                    break;
                default:
                    console.error("Invalid semester");
                    return;
            }
            
            // Update the student in the state with the modified data
            const updatedStudents = students.map((s) =>
                s._id === updatedStudent._id ? updatedStudent : s
            );
            setStudents(updatedStudents);
    
            // Send updated data to the server
            await axios.put(
                `http://localhost:8080/api/students/credit/${updatedStudent._id}`,
                { semester: semester }
            );
            console.log(updatedStudent)
        } catch (error) {
            console.error("Error updating credits:", error);
            // Handle error, show message, etc.
        }
    };
    

    const handleVerify = async (updatedStudent) => {
        try {
            // Update the student in the state with the modified data
            const updatedStudents = students.map((s) =>
                s._id === updatedStudent._id ? updatedStudent : s
            );
            setStudents(updatedStudents);

            // Send updated data to the server
            await axios.put(
                `http://localhost:8080/api/students/StudentProfile/${updatedStudent._id}`,
                updatedStudent
            );
        } catch (error) {
            console.error("Verification failed:", error);
            // Handle error, show message, etc.
        }
    };

    const fetchData = async () => {
        try {
            console.log(facName);
            const response = await axios.get(
                `http://localhost:8080/api/faculty/facultystudent/${facultymail}`
            );
            console.log(response.data);
            setStudents(response.data.student); // Assuming response.data.student is an array of students
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                Welcome, {user.username} !
            </h1>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Student Name
                        </th>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Student ID
                        </th>
                        
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Credits S2
                        </th>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Credits S3
                        </th>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Credits S4
                        </th>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Credits S5
                        </th>
                        <th
                            style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            Credits S6
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.username}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.studentCollegeID}
                            </td>
                            
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.creditss2}
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => changeCredit(student,2)}
                                >
                                    Add
                                </button>
                            </td>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.creditss3}
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => changeCredit(student,3)}
                                >
                                    Add
                                </button>
                            </td>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.creditss4}
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => changeCredit(student,4)}
                                >
                                    Add
                                </button>
                            </td>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.creditss5}
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => changeCredit(student,5)}
                                >
                                    Add
                                </button>
                            </td>
                            <td
                                style={{
                                    border: "1px solid #dddddd",
                                    padding: "8px",
                                }}
                            >
                                {student.creditss6}
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => changeCredit(student,6)}
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display the modal */}
            {selectedStudent && (
                <StudentProfileModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    student={selectedStudent}
                    onVerify={handleVerify}
                />
            )}
        </div>
    );
};

export default StudentCredits;