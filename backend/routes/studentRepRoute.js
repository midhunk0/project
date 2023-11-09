import express from "express";
import { loginStudentRep, profileStudentRep, registerStudentRep, studentsByStudentRep, updateProfile } from "../controllers/studentRepController.js";

const router = express.Router();

router.post("/studentRepRegister", registerStudentRep);
router.post("/studentRepLogin", loginStudentRep);
router.get("/studentRepStudents", studentsByStudentRep);
router.get("/studentRepProfile/:id", profileStudentRep);
router.put("/studentRepEdit/:id", updateProfile);

export default router;