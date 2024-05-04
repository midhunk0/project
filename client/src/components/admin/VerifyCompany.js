import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifyCompany = () => {
    const [recruiters, setRecruiters] = useState([]);

    const fetchRecruiters = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/recruiters/unverified"
            );
            setRecruiters(response.data);
        } catch (error) {
            console.error("Error fetching unverified recruiters:", error);
        }
    };

    useEffect(() => {
        fetchRecruiters();
    }, []);

    const handleVerify = async (recruiterId) => {
        try {
            await axios.put(
                `http://localhost:8080/api/recruiters/${recruiterId}/verify`
            );
            fetchRecruiters();
            window.location.reload();
            const conversationResponse = await axios.post(
                "http://localhost:8080/api/students/conversations",
                {
                    senderId: "6625d50f0ac57115661aa1da", // Replace with the actual admin user ID
                    receiverId: recruiterId,
                }
            );
        } catch (error) {
            console.error("Error verifying recruiter:", error);
        }
    };

    const handleReject = async (recruiterId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/recruiters/${recruiterId}`
            );
            fetchRecruiters();
            window.location.reload();
        } catch (error) {
            console.error("Error rejecting recruiter:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">SL No</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recruiters.map((recruiter, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{recruiter.companyName}</td>
                                    <td>{recruiter.email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() =>
                                                handleVerify(recruiter._id)
                                            }
                                        >
                                            Verify
                                        </button>
                                        &nbsp;
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleReject(recruiter._id)
                                            }
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VerifyCompany;
