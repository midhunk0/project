import express from 'express';

import { updateNotification } from '../controllers/matchedController.js';


const router=express.Router();

router.put("/notification/:id",updateNotification);

export default router;