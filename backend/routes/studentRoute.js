import express from "express";

import {
  registerStudentController,
  loginStudentController,
  getProfileStudentController,
  updateProfileStudentController,
  addProfileDetailsStudentController,
  getallStudentsController,
  updateCredits,
} from "../controllers/studentController.js";

import {
  conversationController,
  getConvController,
  addMessageController,
  getMessageController,
} from "../controllers/conversationController.js";

const router = express.Router();

// Student registration route
router.post("/studentRegister", registerStudentController);

// Student login route
router.post("/studentLogin", loginStudentController);

// Student profile route
router.get("/StudentProfile/:id", getProfileStudentController);
router.put("/StudentProfile/:id", updateProfileStudentController);
router.get("/get-all-students", getallStudentsController);

// Route for adding other profile details
router.put("/StudentProfile/details/:id", addProfileDetailsStudentController);

//router for admin conversations
router.post("/conversations", conversationController);
//get conversation of a user
router.get("/conversations/:userId", getConvController);
//post messages
router.post("/messages", addMessageController);
//get messages
router.get("/messages/:chatId", getMessageController);
//to update student credits
router.put("/credit/:id", updateCredits);

export default router;
