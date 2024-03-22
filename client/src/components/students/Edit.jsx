// @ts-nocheck
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const storedUserData = localStorage.getItem("user");
  const userdata = storedUserData ? JSON.parse(storedUserData) : null;
  const [profileDetails, setProfileDetails] = useState(userdata);
  console.log(profileDetails);
  const navigate = useNavigate();
  const id = userdata?._id;

  const [newSkill, setNewSkill] = useState("");

  const departments = ["CSE", "EEE", "IE", "EC", "AE", "ME", "CIVIL"];

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      if (checked) {
        setProfileDetails((prevDetails) => ({
          ...prevDetails,
          [name]: [...prevDetails[name], value],
        }));
      } else {
        setProfileDetails((prevDetails) => ({
          ...prevDetails,
          [name]: prevDetails[name].filter((skill) => skill !== value),
        }));
      }
    } else if (type === "radio") {
      console.log("Radio ");
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
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
  if (!userdata || userdata.isVerified) {
    return (
      <div>
        <h1>
          You are not allowed to edit your profile Now! Contact your Faculty!
        </h1>
      </div>
    );
  } else {
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
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type="semester"
              name="semester"
              value={profileDetails.semester}
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
            <Form.Label>Gender</Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Male"
              name="gender" // Ensure name is set correctly
              id="radio1"
              value="Male"
              checked={profileDetails.gender === "Male"} // Check if Male is selected
              onChange={handleChange}
            />

            <Form.Check
              inline
              type="radio"
              label="Female"
              name="gender" // Ensure name is set correctly
              id="radio2"
              value="Female"
              checked={profileDetails.gender === "Female"} // Check if Female is selected
              onChange={handleChange}
            />

            <Form.Check
              inline
              type="radio"
              label="Others"
              name="gender" // Ensure name is set correctly
              id="radio3"
              value="Others"
              checked={profileDetails.gender === "Others"} // Check if Others is selected
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name="dob"
              value={profileDetails.dob}
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
            <Form.Label>Blood Group</Form.Label>
            <Form.Control
              type="text"
              name="bloodGroup"
              value={profileDetails.bloodGroup}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Aadhaar</Form.Label>
            <Form.Control
              type="text"
              name="aadhaar"
              value={profileDetails.aadhaar}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Domicile State</Form.Label>
            <Form.Control
              type="text"
              name="domicileState"
              value={profileDetails.domicileState}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Religion</Form.Label>
            <Form.Control
              type="text"
              name="religion"
              value={profileDetails.religion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={profileDetails.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Mother Tongue</Form.Label>
            <Form.Control
              type="text"
              name="motherTongue"
              value={profileDetails.motherTongue}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Plus Two Grade</Form.Label>
            <Form.Control
              type="number"
              name="plustwograde"
              value={profileDetails.plustwograde}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Tenth Grade</Form.Label>
            <Form.Control
              type="number"
              name="tenthgrade"
              value={profileDetails.tenthgrade}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Cleared Backlogs</Form.Label>
            <Form.Control
              type="number"
              name="clearedBacklogs"
              value={profileDetails.clearedBacklogs}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Non Cleared Backlogs</Form.Label>
            <Form.Control
              type="number"
              name="nonclearedBacklogs"
              value={profileDetails.nonclearedBacklogs}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Keam Rank</Form.Label>
            <Form.Control
              type="number"
              name="rank"
              value={profileDetails.rank}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Admission Qouta</Form.Label>
            <Form.Control
              type="text"
              name="admissionQouta"
              value={profileDetails.admissionQouta}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Admission Number</Form.Label>
            <Form.Control
              type="text"
              name="admissionNumber"
              value={profileDetails.admissionNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Admitted Scheme</Form.Label>
            <Form.Control
              type="text"
              name="admittedScheme"
              value={profileDetails.admittedScheme}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Admitted Program</Form.Label>
            <Form.Control
              type="text"
              name="admittedProgram"
              value={profileDetails.admittedProgram}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Admitted Type</Form.Label>
            <Form.Control
              type="text"
              name="admittedType"
              value={profileDetails.admittedType}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              name="department"
              value={profileDetails.department}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Staff Advisor Email</Form.Label>
            <Form.Control
              type="text"
              name="facultyEmail"
              value={profileDetails.facultyEmail}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="skills">
            <Form.Label>Skills</Form.Label>
            {profileDetails.skills.map((skill, index) => (
              <Box key={index} className="d-flex align-items-center mb-2">
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
              <Button variant="primary" size="sm" onClick={handleAddSkill}>
                Add
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>CGPA</Form.Label>
            <Form.Control
              type="number"
              name="cgpa"
              value={profileDetails.cgpa}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="text"
              name="profilePicture"
              placeholder="Enter your photo Image Address"
              value={profileDetails.profilePicture} // Set value to display the current link if available
              onChange={handleChange} // Use the handleChange function to update the profilePicture link
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>CV</Form.Label>
            <Form.Control
              type="text"
              name="cv"
              placeholder="Enter Google Drive link"
              value={profileDetails.cv} // Set value to display the current link if available
              onChange={handleChange} // Use the handleChange function to update the profilePicture link
            />
          </Form.Group>

          <Button variant="primary mt-3 mb-3" type="submit">
            Submit
          </Button>
        </Form>
        <Toaster position="top-center" />
      </Box>
    );
  }
};

export default Edit;
