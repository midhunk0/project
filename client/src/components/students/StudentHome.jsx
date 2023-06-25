import React, { useState, useEffect } from "react";
import "./studentHome.css";
import {
    Box,
    Button,
    TextField,
    Typography,
    styled,
    Snackbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CssTextField from "../global/CssTextField";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

const StudentHome = () => {
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const [flag, setFlag] = useState(false); 
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const { user } = useContext(AuthContext);
    const id = user._id;



    const dataStudent = useFetch(`http://localhost:8080/api/students/StudentProfile/${id}`);
    const student = dataStudent.data;

    
    useEffect(() => {
        // Check if the password has been updated
        if (student && student.password === "") {
            setFlag(true);
        }
    }, [student]);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/students/StudentPassword/${id}`,
                {
                    newPassword: password,
                }
            );
            setSnackbarOpen(true);
            setPassword("");
            setFlag(false);
            setPasswordUpdated(true);
        } catch (err) {
            console.log(err.response); // Log the error response for troubleshooting
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(true);
    };

    return (
        <div
            className="background  rounded "
            style={{ width: "30rem", marginLeft: "20%" }}
        >
            <div className="container mt-5">
                {flag ? (
                    <Box
                        height="100vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            bgcolor="white"
                            padding="20px 60px"
                            borderRadius="10px"
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                            gap="10px"
                        >
                            <Typography
                                variant="h5"
                                marginTop="10px"
                                marginBottom="30px"
                            >
                                Update Password
                            </Typography>
                            <CssTextField
                                required
                                id="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                                label="New Password"
                                disabled={passwordUpdated} // Disable the input if password is already updated
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={passwordUpdated} // Disable the button if password is already updated
                            >
                                Update
                            </Button>
                        </Box>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message="Password updated successfully"
                        />
                    </Box>
                ) : (
                    <div
                        className="card"
                        style={{ maxWidth: "40rem", width: "100%" }}
                    >
                        <div className="item">
                            {/* <img
                                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                alt=""
                                className="itemImg"
                            /> */}
                            <div className="details">
                                <h1 className="itemTitle">
                                    {student.username}
                                </h1>
                                <div className="detailItem">
                                    <span className="itemKey">College ID:</span>
                                    <span className="itemValue">
                                        {student.studentCollegeID}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">
                                        {student.email}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">
                                        +91 {student.phone}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        {student.address}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Department:</span>
                                    <span className="itemValue">
                                        {student.department}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">CGPA:</span>
                                    <span className="itemValue">
                                        {student.cgpa}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Backlogs:</span>
                                    <span className="itemValue">
                                        {student.backlogs}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Skills:</span>
                                    <span className="itemValue">
                                        {student && student.skills && (
                                            <div>
                                                {student.skills.join(", ")}
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentHome;
