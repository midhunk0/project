import express from "express";

import {
  postJafController,
  getJafController,
  updateJafController,
  isAdminJafSent,
  getAdminNotifications,
  updateNbController,
  sentEmailToStudentsController,
  updateIsAdminReadController,
  updateIsStudentReadController,
  jafPutNbDeadlineController
} from "../controllers/jafController.js";
const router = express.Router();

router.post("/jafPost", postJafController);
router.put("/jafAdminSent/:id", isAdminJafSent);
router.put("/updateNb/:id", updateNbController);
router.get("/jafGet/:id", getJafController);
router.put("/jafPut/:id", updateJafController);
router.put("/jafPutNbDeadline/:id",jafPutNbDeadlineController)
router.get("/notification", getAdminNotifications);
router.put("/updateIsAdminRead/:recruiterId", updateIsAdminReadController);
router.put("/notification/updateIsStudentRead/:notificationId", updateIsStudentReadController);
router.post("/send-email-to-students",sentEmailToStudentsController);


export default router;
