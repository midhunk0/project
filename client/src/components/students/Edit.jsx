import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Edit = () => {
    // const { user } = useContext(AuthContext);

    const userdata = JSON.parse(localStorage.getItem("user"));
    const [profileDetails, setProfileDetails] = useState(userdata);
    console.log(profileDetails);

    const id = userdata._id;

    const [newSkill, setNewSkill] = useState("");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setProfileDetails((prevDetails) => ({
                ...prevDetails,
                [name]: files[0],
            }));
        } else if (type === "checkbox") {
            if (e.target.checked) {
                setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    [name]: [...prevDetails[name], value],
                }));
            } else {
                setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    [name]: prevDetails[name].filter(
                        (skill) => skill !== value
                    ),
                }));
            }
        } else {
            setProfileDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            setProfileDetails((prevDetails) => ({
                ...prevDetails,
                skills: [...prevDetails.skills, newSkill.trim()],
            }));
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (index) => {
        setProfileDetails((prevDetails) => {
            const updatedSkills = [...prevDetails.skills];
            updatedSkills.splice(index, 1);
            return {
                ...prevDetails,
                skills: updatedSkills,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(profileDetails).forEach(([key, value]) => {
            if (value !== null && typeof value !== "object") {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            }
        });
        console.log(profileDetails);
        // console.log(id)
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]); // Log each field and its value
        // }// This will still log an empty object, but the data is present
        try {
            const res = await axios.put(
                `http://localhost:8080/api/students/StudentProfile/${id}`,
                profileDetails
            );

            toast.success("Profile updated..");
            // Log the response data for troubleshooting
            // Reset the form or perform any other necessary actions
            localStorage.setItem("user", JSON.stringify(profileDetails));
        } catch (err) {
            console.log(err.response); // Log the error response for troubleshooting
        }
    };

    return (
        <Box className="container col-md-7">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={profileDetails.username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={profileDetails.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={profileDetails.phone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={profileDetails.address}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        name="department"
                        value={profileDetails.department}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    {profileDetails.skills.map((skill, index) => (
                        <Box
                            key={index}
                            className="d-flex align-items-center mb-2"
                        >
                            <Form.Control
                                type="text"
                                value={skill}
                                readOnly
                                className="me-2"
                            />
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveSkill(index)}
                            >
                                Remove
                            </Button>
                        </Box>
                    ))}
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="me-2"
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleAddSkill}
                        >
                            Add
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="profilePicture"
                        accept="image/jpeg"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>CV</Form.Label>
                    <Form.Control
                        type="file"
                        name="cv"
                        accept="application/pdf"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary mt-3 mb-3" type="submit">
                    Submit
                </Button>
            </Form>
            <Toaster position="top-center" />
        </Box>
    );
};

export default Edit;
