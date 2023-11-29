import express from "express";

import {
  registerRecruiterController,
  loginRecruiterController,
  changePasswordStudentController,
  updateRecruitRequest,
  updateProfileRecruiterController,
  getProfileRecruiterController,
  getAllRecruiters,
  matchRequirements,
  getCompaniesWithMatchedStudents,
  getCompanyWithMatchedStudents,
  getStudentById,
  postNotificationController,
  getNotificationController,
  getRecruiterById,
} from "../controllers/recruiterController.js";

import {
  addMessageController,
  getConvController,
  getMessageController,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/recruiterRegister", registerRecruiterController);
router.post("/recruiterLogin", loginRecruiterController);
router.get("/recruiterProfile/:id", getProfileRecruiterController);
router.put("/recruiterProfile/:id", updateProfileRecruiterController);
router.put("/recruiterRequest/:id", updateRecruitRequest);
// router.post("/students/:studentId/notifications",requestController)
router.get("/getall", getAllRecruiters);
router.get("/getRecruiterById/:id", getRecruiterById);
router.post("/recruitermatch/:id", matchRequirements);
router.get("/companies", getCompaniesWithMatchedStudents);
router.get("/companies/:id", getCompanyWithMatchedStudents);
router.get("/students/:id", getStudentById);
router.put("/recruiterPassword/:id", changePasswordStudentController);
router.post("/notifications", postNotificationController);
// Route for fetching notifications
router.get("/notifications", getNotificationController);
// Route for fetching a company by recruiter ID
router.post("/messages", addMessageController);
router.get("/messages/:chatId", getMessageController);
router.get("/conversations/:userId", getConvController);

export default router;
