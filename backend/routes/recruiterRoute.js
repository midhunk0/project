import express from 'express';

import { registerRecruiterController, loginRecruiterController, changePasswordStudentController, updateRecruitRequest, updateProfileRecruiterController, getProfileRecruiterController, getAllRecruiters } from '../controllers/recruiterController.js';

const router = express.Router();

router.post("/recruiterRegister", registerRecruiterController);
router.post("/recruiterLogin", loginRecruiterController);
router.get("/recruiterProfile/:id", getProfileRecruiterController);
router.put("/recruiterProfile/:id", updateProfileRecruiterController);
router.put("/recruiterRequest/:id", updateRecruitRequest);
router.get("/getall",getAllRecruiters);
router.put("/recruiterPassword/:id", changePasswordStudentController);
export default router;