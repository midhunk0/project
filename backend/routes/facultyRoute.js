import express from "express";
import { registerfacultyController } from "../controllers/facultyController.js";
const router=express.Router();

router.post("/facultyRegister",registerfacultyController);

export default router;