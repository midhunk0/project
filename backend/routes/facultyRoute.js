import express from "express";
import { editFacultyProfile, getStudentsByFaculty, loginfacultyController, registerfacultyController } from "../controllers/facultyController.js";
const router=express.Router();

router.post("/facultyRegister", registerfacultyController);
router.post("/facultyLogin", loginfacultyController);
router.get("/facultystudent/:facultymail", getStudentsByFaculty);
router.get("/facultyProfile:id", editFacultyProfile);
router.put("/facultyEdit/:id", editFacultyProfile);



export default router;