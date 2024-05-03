import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress,Button } from "@mui/material";
import { Table } from "react-bootstrap";
import axios from "axios";
import "./Students.css";
import StudentProfileModal from "../faculty/StudentProfileModal";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [domicileStateFilter, setDomicileStateFilter] = useState("");

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/students/get-all-students"
        );
        setStudents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const domicileStateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const handleChangeFilter = async (filterType, value) => {
    switch (filterType) {
      case "department":
        setDepartmentFilter(value);
        break;
      case "gender":
        setGenderFilter(value);
        break;
      case "verified":
        setVerifiedFilter(!verifiedFilter);
        break;
      case "category":
        setCategoryFilter(value);
        break;
      case "cgpa":
        setCgpaFilter(value);
        break;
      case "domicileState":
        setDomicileStateFilter(value);
        break;

      default:
        break;
    }
    // Force page refresh after filter change
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/students/get-all-students"
        );
        const filteredStudents = response.data.filter(
          (student) =>
            student.studentCollegeID !== "admin123" &&
            (!departmentFilter ||
              student.department.toLowerCase() ===
                departmentFilter.toLowerCase()) &&
            (!genderFilter || student.gender === genderFilter) &&
            (!verifiedFilter || student.isVerified) &&
            (!categoryFilter ||
              student.category.toLowerCase() ===
                categoryFilter.toLowerCase()) &&
            (!cgpaFilter || student.cgpa >= parseFloat(cgpaFilter)) &&
            (!domicileStateFilter ||
              student.domicileState.toLowerCase() ===
                domicileStateFilter.toLowerCase())
        );
        setStudents(filteredStudents);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [
    departmentFilter,
    genderFilter,
    verifiedFilter,
    categoryFilter,
    cgpaFilter,
    domicileStateFilter,
  ]);

  return (
    <main className="page catalog-page">
      <section className="clean-block clean-catalog dark">
        <div className="container-fluid">
          <div className="block-heading">
            <Typography variant="h2" className="text-info">
              Complete Student's list
            </Typography>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-3">
                <div className="d-none d-md-block">
                  <div className="filters">
                    <div className="filter-item">
                      <h5>Department</h5>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="cseCheckbox"
                          onChange={() =>
                            handleChangeFilter("department", "Computer Science")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cseCheckbox"
                        >
                          CSE
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="eeeCheckbox"
                          onChange={() =>
                            handleChangeFilter(
                              "department",
                              "electronics and communication "
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="eeeCheckbox"
                        >
                          EC
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ecCheckbox"
                          onChange={() =>
                            handleChangeFilter(
                              "department",
                              "Electrical and Electronics"
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="ecCheckbox"
                        >
                          EEE
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="mechCheckbox"
                          onChange={() =>
                            handleChangeFilter("department", "Mechanical")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="mechCheckbox"
                        >
                          MECH
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="civilCheckbox"
                          onChange={() =>
                            handleChangeFilter("department", "civil")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="civilCheckbox"
                        >
                          CIVIL
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="civilCheckbox"
                          onChange={() =>
                            handleChangeFilter("department", "Industrial")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="civilCheckbox"
                        >
                          INDUSTRIAL
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="civilCheckbox"
                          onChange={() =>
                            handleChangeFilter(
                              "department",
                              "Applied Electronics and instrumentation"
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="civilCheckbox"
                        >
                          AEI
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="filter-item">
                      <h5>Gender</h5>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="maleRadio"
                          name="gender"
                          value="Male"
                          onChange={() => handleChangeFilter("gender", "Male")}
                        />
                        <label className="form-check-label" htmlFor="maleRadio">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="femaleRadio"
                          name="gender"
                          value="Female"
                          onChange={() =>
                            handleChangeFilter("gender", "Female")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="femaleRadio"
                        >
                          Female
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="otherRadio"
                          name="gender"
                          value="Others"
                          onChange={() =>
                            handleChangeFilter("gender", "Others")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="otherRadio"
                        >
                          Others
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="filter-item">
                      <h5>Verification</h5>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="verifiedCheckbox"
                          onChange={() => handleChangeFilter("verified")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="verifiedCheckbox"
                        >
                          Verified
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="filter-item">
                      <h5>Category</h5>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() =>
                            handleChangeFilter("category", "general")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cseCheckbox"
                        >
                          GENERAL
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => handleChangeFilter("category", "obc")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cseCheckbox"
                        >
                          OBC
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => handleChangeFilter("category", "sc")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cseCheckbox"
                        >
                          SC
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => handleChangeFilter("category", "st")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cseCheckbox"
                        >
                          ST
                        </label>
                      </div>
                    </div>
                    <div className="filter-item">
                      <h5>CGPA</h5>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter minimum CGPA"
                        onChange={(e) =>
                          handleChangeFilter("cgpa", e.target.value)
                        }
                      />
                    </div>
                    <div className="filter-item">
                      <h5>Domicile State</h5>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleChangeFilter("domicileState", e.target.value)
                        }
                      >
                        <option value="">Select Domicile State</option>
                        {domicileStateOptions.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="filter-item">
                    {selectedStudent && (
        <StudentProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          student={selectedStudent}
          // You can add any additional props needed for your modal
        />
      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="products">
                  <div className="row g-0">
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>College ID</th>
                            <th>Email</th>
                            <th>Current CGPA</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Domicile State</th>
                            <th>Full Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student, index) => (
                            <tr key={student.id}>
                              <td>{index + 1}</td>
                              <td>{student.username}</td>
                              <td>{student.studentCollegeID}</td>
                              <td>{student.email}</td>
                              <td>{student.cgpa}</td>
                              <td>{student.department}</td>
                              <td>{student.phone}</td>
                              <td>{student.domicileState}</td>
                              <td>
        <Button onClick={() => handleViewProfile(student)} variant="outlined">
          View Profile
        </Button>
      </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Student;
