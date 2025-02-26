import express from "express";
const router = express.Router();

import {
  createApplication,
  getApplicationsByRecruiterId,
  updateApplication,
  updateIsAdminVerified,
  getApplicationsByStudentId,
} from "../controllers/applicationController.js";

// To create a new application
router.post("/createApplication", createApplication);
//to get applications by recruiter
router.get("/getApplicationsByRecruiterId/:id", getApplicationsByRecruiterId);
router.get("/getApplicationsByStudentId/:id", getApplicationsByStudentId);
router.put("/updateApplication/:id", updateApplication);
router.put("/updateIsAdminVerified/:id", updateIsAdminVerified);


export default router;
