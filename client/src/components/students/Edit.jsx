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

  const departments = [
    "Computer Science",
    "Electronics and Communication",
    "Mechanical",
    "Civil",
    "Electrical and Electronics",
    "Applied Electronics & Instrumentation",
    "Industrial",
  ];

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
    try {
      const res = await axios.put(
        `https://project-api-iwiy.onrender.com/api/students/StudentProfile/${id}`,
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh" /* Adjust the height as needed */,
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCCCB" /* Caution box background color */,
            padding: "20px",
            border: "1px solid #FF0000" /* Red border for the caution box */,
            borderRadius: "5px" /* Rounded corners */,
            textAlign: "center",
            width: "50%" /* Adjust the width as needed */,
          }}
        >
          <h1>
            You are not allowed to edit your profile Now! Contact your Faculty!
          </h1>
        </div>
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
              as="select"
              name="domicileState"
              value={profileDetails.domicileState}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Domicile State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </Form.Control>
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
              placeholder="Enter percentage"
              value={profileDetails.plustwograde}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Tenth Grade</Form.Label>
            <Form.Control
              type="number"
              name="tenthgrade"
              placeholder="Enter percentage"
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
            <Form.Label>Passout Year</Form.Label>
            <Form.Control
              type="number"
              name="passoutYear"
              value={profileDetails.passoutYear}
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
