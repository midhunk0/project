/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const FacultyHome = () => {
    const { user } = useContext(AuthContext);
    const facName = user.username;
    const [students, setStudents] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/faculty/facultystudent/?faculty=${facName}`
            );
            setStudents(response.data.student); // Assuming response.data.student is an array of students
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
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{student.username}</td>
                            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{student.studentCollegeID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyHome;