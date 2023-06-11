// import React, { useState, useEffect } from "react";
// import './studentHome.css'
// import {
//     Box,
//     Button,
//     TextField,
//     Typography,
//     styled,
//     Snackbar,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import useFetch from "../../hooks/useFetch";
// import { useContext } from "react";
// import { SearchContext } from "../../contexts/SearchContext";

// const CssTextField = styled(TextField)({
//     "& label.Mui-focused": {
//         color: "#A0AAB4",
//     },
//     "& .MuiOutlinedInput-root": {
//         "&.Mui-focused fieldset": {
//             borderColor: "#6F7E8C",
//         },
//     },
// });

// const StudentHome = () => {
//     const [password, setPassword] = useState("");
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [flag, setFlag] = useState(false);
//     const [passwordUpdated, setPasswordUpdated] = useState(false);
//     const {id}=useContext(SearchContext);



//     const dataStudent = useFetch(`/api/students/StudentProfile/${id}`);
//     const student = dataStudent.data;
//     console.log(student)

//     useEffect(() => {
//         // Check if the password has been updated
//         if (student && student.password === "") {
//             setFlag(true)
//         }
//     }, [student]);

//     const handleChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(
//                 `http://localhost:8080/api/students/StudentPassword/${id}`,
//                 {
//                     newPassword: password
//                 },

//             );
//             setSnackbarOpen(true);
//             setPassword("");
//             setPasswordUpdated(true);
//         } catch (err) {
//             console.log(err.response); // Log the error response for troubleshooting
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(true);
//     };

//     return (
//         <div>
//             {flag ?
//                 <Box
//                     height="91.5vh"
//                     width="100%"
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     bgcolor="whitesmoke"
//                 >
//                     <Box
//                         bgcolor="white"
//                         padding="20px 60px"
//                         borderRadius="10px"
//                         display="flex"
//                         alignItems="center"
//                         flexDirection="column"
//                         gap="10px"
//                     >
//                         <Typography variant="h5" marginTop="10px" marginBottom="30px">
//                             Update Password
//                         </Typography>
//                         <CssTextField
//                             required
//                             id="password"
//                             type="password"
//                             value={password}
//                             onChange={handleChange}
//                             label="New Password"
//                             disabled={passwordUpdated} // Disable the input if password is already updated
//                         />
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleSubmit}
//                             disabled={passwordUpdated} // Disable the button if password is already updated
//                         >
//                             Update
//                         </Button>
//                     </Box>
//                     <Snackbar
//                         open={snackbarOpen}
//                         autoHideDuration={3000}
//                         onClose={handleCloseSnackbar}
//                         message="Password updated successfully"
//                     />
//                 </Box> :
//                 <>
//                     <div className="left">
//                         <div className="item">
//                             <img
//                                 src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                                 alt=""
//                                 className="itemImg"
//                             />
//                             <div className="details">
//                                 <h1 className="itemTitle">{student.username}</h1>
//                                 <div className="detailItem">
//                                     <span className="itemKey">Email:</span>
//                                     <span className="itemValue">{student.email}</span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">Phone:</span>
//                                     <span className="itemValue">+ {student.phone}</span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">Address:</span>
//                                     <span className="itemValue">
//                                         {student.address}
//                                     </span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">Department:</span>
//                                     <span className="itemValue">{student.department}</span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">CGPA:</span>
//                                     <span className="itemValue">{student.cgpa}</span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">backlogs:</span>
//                                     <span className="itemValue">{student.backlogs}</span>
//                                 </div>
//                                 <div className="detailItem">
//                                     <span className="itemKey">skills:</span>
//                                     {/* <span className="itemValue">
//                                         {student.skills.map((skill)=>{
//                                             return(
//                                                 <div>
//                                                     {skill}
//                                                 </div>
//                                             )
//                                         })}
//                                         </span> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>}

//         </div>
//     );
// };

// export default StudentHome;






import React, { useState, useEffect, useContext } from "react";
import './studentHome.css'
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
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#A0AAB4",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
        },
    },
});

const StudentHome = () => {
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
<<<<<<< Updated upstream
    const {user}=useContext(AuthContext);
    const id=user._id;
=======
    const { id } = useContext(SearchContext) || {};
>>>>>>> Stashed changes

    const dataStudent = useFetch(`/api/students/StudentProfile/${id}`) || { data: null };
    const student = dataStudent.data;
<<<<<<< Updated upstream
=======
    console.log(student);
>>>>>>> Stashed changes

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
                    newPassword: password
                }
            );
            setSnackbarOpen(true);
            setPassword("");
            setPasswordUpdated(true);
        } catch (err) {
            console.log(err.response); // Log the error response for troubleshooting
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            {flag ? (
                <Box
                    height="91.5vh"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="whitesmoke"
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
                <div className="left">
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            alt=""
                            className="itemImg"
                        />
                        <div className="details">
                            <h1 className="itemTitle">{student.username}</h1>
                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">{student.email}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Phone:</span>
                                <span className="itemValue">+ {student.phone}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Address:</span>
                                <span className="itemValue">
                                    {student.address}
                                </span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Department:</span>
                                <span className="itemValue">{student.department}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">CGPA:</span>
                                <span className="itemValue">{student.cgpa}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Backlogs:</span>
                                <span className="itemValue">{student.backlogs}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Skills:</span>
                                <span className="itemValue">
                                    {student.skills && student.skills.map((skill) => (
                                        <div key={skill}>{skill}</div>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentHome;
