import express from "express";

import {
    registerRecruiterController,
    loginRecruiterController,
    changePasswordRecruiterController,
    updateProfileRecruiterController,
    getProfileRecruiterController,
    getAllRecruiters,
    getRecruiterById,
    getRecruitersSentJaf,
    getRecruitersByCompanyIds,
    recruiterJafController,
    getUnverifiedRecruiters,
    verifyRecruiter,
    rejectRecruiter,
    updateIsPasswordChangedController,
    updatePasswordController,
    forgotPasswordController,
    updateForgotPasswordController,
    verifyOTPController,
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
// router.put("/recruiterRequest/:id", updateRecruitRequest);
// router.post("/students/:studentId/notifications",requestController)
// router.get("/getall", getAllRecruiters);
// router.post("/recruitermatch/:id", matchRequirements);
// router.get("/companies", getCompaniesWithMatchedStudents);
// router.get("/companies/:id", getCompanyWithMatchedStudents);
// router.get("/students/:id", getStudentById);
router.put("/recruiterPassword/:id", changePasswordRecruiterController);
// router.post("/notifications", postNotificationController);
// Route for fetching notifications
// router.get('/notifications', getNotificationController);
// Route for fetching a company by recruiter ID
router.post("/messages", addMessageController);
router.get("/messages/:chatId", getMessageController);
router.get("/conversations/:userId", getConvController);
router.get("/getAllRecruiters", getAllRecruiters);
router.post("/getRecruitersByCompanyIds", getRecruitersByCompanyIds);
router.get("/getRecruiterById/:recruiterId", getRecruiterById);
router.get("/getRecruitersSentjaf", getRecruitersSentJaf); //get all recruiters who sent jaf
router.put("/updateisjafSentfalse/:id", recruiterJafController);

router.get("/unverified", getUnverifiedRecruiters);
router.put("/:recruiterId/verify", verifyRecruiter);
router.delete("/:recruiterId", rejectRecruiter);

router.put("/updatePassword/:id", updatePasswordController);
router.put("/updateIsPasswordChanged/:id", updateIsPasswordChangedController);
router.post("/forgotPassword", forgotPasswordController);
router.post("/verifyOTP", verifyOTPController);
router.put("/updateForgotPassword", updateForgotPasswordController);

export default router;
