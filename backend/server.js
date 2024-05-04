import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import studentRoute from "./routes/studentRoute.js";
import recruiterRoute from "./routes/recruiterRoute.js";
import matchedRoute from "./routes/matchedRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import studentRepRoute from "./routes/studentRepRoute.js";
import jafRoute from "./routes/jafRoute.js";
import applicationRoute from "./routes/applicationRoute.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

import cors from "cors";
// Configure env
dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to PMS",
  });
});
app.use("/api/students", studentRoute);
app.use("/api/recruiters", recruiterRoute);
app.use("/api/matched", matchedRoute);
app.use("/api/faculty", facultyRoute);
app.use("/api/studentRep", studentRepRoute);
app.use("/api/jaf", jafRoute);
app.use("/api/application",applicationRoute);


//to handle errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8080;
app.get("/test", (req, res) => {
  console.log("hlelo");
  res.send("he");
});
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});

//added

import multer from "multer";
import mongoose from "mongoose";
app.use("/files", express.static("files"));

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./files")
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
import {} from "./models/trainingModel.js"
import { updatePasswordController } from "./controllers/studentController.js";
const PdfSchema=mongoose.model("PdfDetails")
const upload=multer({storage: storage});

app.post("/upload-files", upload.single("file"), async(req, res)=>{
    console.log(req.file)
    const title=req.body.title;
    const fileName=req.file.filename;
    const topic=req.body.topic;
    try{
        await PdfSchema.create({title:title, pdf:fileName, topic: topic})
        res.send({status: "ok"})
    }
    catch(error){
        res.json({status:error})
    }
})

app.get("/get-files", async (req, res) => {
    try {
        const pdfData = await PdfSchema.find({}).lean(); 

        const filesByTopic = {};
        pdfData.forEach((pdf) => {
            const { topic, title, pdf: fileName } = pdf;
            if (!filesByTopic[topic]) {
                filesByTopic[topic] = [];
            }
            filesByTopic[topic].push({ title, fileName });
        });

        res.send({ status: "ok", data: filesByTopic });
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ status: "error", error: error.message });
    }
});

app.get("/get-distinct-topics", async (req, res) => {
    try {
        const topics = await PdfSchema.distinct("topic");
        res.json({ topics });
    } catch (error) {
        console.error("Error fetching distinct topics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/add-topic", async (req, res) => {
    const { topic } = req.body;
    try {
        const existingTopic = await PdfSchema.findOne({ topic });
        if (existingTopic) {
            return res.status(400).json({ error: "Topic already exists" });
        }

        const newTopic = new PdfSchema({ topic });
        await newTopic.save();

        res.status(201).json({ message: "Topic added successfully", topic });
    } catch (error) {
        console.error("Error adding topic:", error);
        res.status(500).json({ error: "Internal Server Error" });
}
});
