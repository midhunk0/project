import express from "express";
import { editFacultyProfile, getStudentsByFaculty, loginfacultyController, registerfacultyController, selectedStudent } from "../controllers/facultyController.js";
const router=express.Router();

router.post("/facultyRegister", registerfacultyController);
router.post("/facultyLogin", loginfacultyController);
router.get("/facultystudent/:facultymail", getStudentsByFaculty);
router.get("/facultyProfile:id", editFacultyProfile);
router.put("/facultyEdit/:id", editFacultyProfile);
router.get("/facultySelects/:id/:id", selectedStudent);




export default router;