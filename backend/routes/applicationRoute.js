import express from "express";
const router = express.Router();

import { createApplication, getApplicationsByRecruiterId, updateApplication } from "../controllers/applicationController.js";

// To create a new application
router.post("/createApplication", createApplication);
//to get applications by recruiter
router.get("/getApplicationsByRecruiterId/:id",getApplicationsByRecruiterId);
router.put("/updateApplication/:id", updateApplication);
export default router;
