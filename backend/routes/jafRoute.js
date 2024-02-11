import express from "express";

import {
  postJafController,
  getJafController,
  updateJafController,
} from "../controllers/jafController.js";
const router = express.Router();

router.post("/jafPost", postJafController);

router.get("/jafGet/:id", getJafController);
router.put("/jafPut/:id",updateJafController);

export default router;
