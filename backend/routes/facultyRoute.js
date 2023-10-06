import express from "express";
import { getStudentsByFaculty, loginfacultyController, registerfacultyController } from "../controllers/facultyController.js";
const router=express.Router();

router.post("/facultyRegister",registerfacultyController);
router.post("/facultyLogin",loginfacultyController);
router.get("/facultystudent",getStudentsByFaculty);

export default router;