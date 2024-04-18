import express from "express";

import {
  postJafController,
  getJafController,
  updateJafController,
  isAdminJafSent,
  getAdminNotifications,
  updateNbController,
  sentEmailToStudentsController
} from "../controllers/jafController.js";
const router = express.Router();

router.post("/jafPost", postJafController);
router.put("/jafAdminSent/:id", isAdminJafSent);
router.put("/updateNb/:id", updateNbController);
router.get("/jafGet/:id", getJafController);
router.put("/jafPut/:id", updateJafController);
router.get("/notification", getAdminNotifications);
router.post("/send-email-to-students",sentEmailToStudentsController);


export default router;
