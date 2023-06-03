import express from "express";

import multer from "multer";
import xlsx from "xlsx";
import {
  registerStudentController,
  loginStudentController,
  getProfileStudentController,
  updateProfileStudentController,
  uploadExcelStudentController,
  changePasswordStudentController,
  addProfileDetailsStudentController
} from "../controllers/studentController.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  }
});
const upload = multer({ storage });

// Create a router instance


// Student registration route
router.post("/studentRegister", registerStudentController);

// Student login route
router.post("/studentLogin", loginStudentController);

// Student profile route
router.get("/StudentProfile", getProfileStudentController);
router.put("/StudentProfile", updateProfileStudentController);

// Route for uploading Excel file and registering students
router.post(
  "/excelUpload",
  upload.single("file"), // 'file' is the field name in the form for file upload
  uploadExcelStudentController
);

// Route for changing password
router.put("/StudentPassword", changePasswordStudentController);

// Route for adding other profile details
router.put("/StudentProfile/details", addProfileDetailsStudentController);

export default router;
