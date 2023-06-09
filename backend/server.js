import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import studentRoute from "./routes/studentRoute.js";
import cors from "cors";
// Configure env
dotenv.config();

// Database config
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to PMS",
    });
});
app.use("/api/students", studentRoute);

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
