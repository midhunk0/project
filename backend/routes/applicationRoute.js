import express from "express";
const router = express.Router();

import { createApplication } from "../controllers/applicationController.js";

// To create a new application
router.post("/createApplication", createApplication);

export default router;
