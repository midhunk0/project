import express from "express";

import { postJafController,getJafController } from "../controllers/jafController.js";
const router=express.Router();


router.post("/jafPost", postJafController);

router.get("/jafGet",getJafController);


export default router;