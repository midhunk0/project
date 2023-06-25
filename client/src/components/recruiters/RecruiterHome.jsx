import React, { useState, useEffect } from "react";

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

const RecruiterHome = () => {
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const [flag, setFlag] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const { user } = useContext(AuthContext);
    const id = user._id;

    console.log(id);

    const dataRecruiter = useFetch(
        `http://localhost:8080/api/recruiters/recruiterProfile/${id}`
    );
    const recruiter = dataRecruiter.data;

    useEffect(() => {
        // Check if the password has been updated
        if (recruiter && recruiter.password === "") {
            setFlag(true);
        }
    }, [recruiter]);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/recruiters/recruiterPassword/${id}`,
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

    return flag ? (
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
                <Typography variant="h5" marginTop="10px" marginBottom="30px">
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
            style={{
                margin: "20px",
                width: "100%",
                borderRadius: "5px",
                boxShadow: "1px 2px 9px gray",
            }}
        >
            <img
                src="../../assets/apple-bg.jpeg"
                alt="apple"
                style={{
                    width: "100%",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                }}
            />
            <div>
                {/* <div>
                    <img
                        src="../../assets/apple-logo.jpeg"
                        alt="apple"
                        style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "5px",
                            transform: "translate(50px, -50px)",
                        }}
                    />
                </div> */}
                <div>
                    <h1
                        style={{
                            marginLeft: "50px",
                        }}
                    >
                        {user.companyName}
                    </h1>
                    <h6
                        style={{
                            marginLeft: "50px",
                        }}
                    > {user.contactPerson}</h6>
                    <p
                        style={{
                            marginLeft: "50px",
                            color: "gray",
                        }}
                    >
                        {user.address}
                    </p>
                </div>
                <div
                    style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        margin: "0 20px 0 50px",
                        marginBottom: "30px",
                    }}
                >
                    <div
                        className=""
                        style={{
                            margin: "20px",
                        }}
                    >
                        <h2> New Notifications</h2>
                        <ul
                            style={{
                                listStyleType: "none",
                                marginLeft: "-20px",
                            }}
                        >
                            <li>
                                <a
                                    href="matched"
                                    style={{ textDecoration: "none" }}
                                >
                                    Matched Profiles
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterHome;
