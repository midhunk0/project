import express from 'express';

import { registerRecruiterController } from '../controllers/recruiterController.js';

const router=express.Router();

router.post("/recruiterRegister",registerRecruiterController);

export default router;