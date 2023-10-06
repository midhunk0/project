import express from "express";
import { loginfacultyController, registerfacultyController } from "../controllers/facultyController.js";
const router=express.Router();

router.post("/facultyRegister",registerfacultyController);
router.post("/facultyLogin",loginfacultyController)

export default router;