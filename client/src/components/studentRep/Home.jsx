/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const FacultyHome = () => {
    const { user } = useContext(AuthContext);
    const repId = user._id;
    console.log(repId)
    const [studentsByRep, setStudentsByRep] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/studentRep/studentRepStudents?studentRep=${repId}`
            );
            console.log(response);
            setStudentsByRep(response.data.students); // Assuming response.data.student is an array of students
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome, {user.username}</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Student Name</th>
                        <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Student ID</th>
                    </tr>
                </thead>
                <tbody>
                {studentsByRep && studentsByRep.length > 0 ? (
                    studentsByRep.map((student) => (
                        <tr key={student._id}>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{student.username}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{student.studentCollegeID}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" style={{ textAlign: 'center' }}>No students found</td>
                    </tr>
                )}

                </tbody>
            </table>
        </div>
    );
};

export default FacultyHome;
