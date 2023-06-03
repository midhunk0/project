import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import studentRoute from "./routes/studentRoute.js";

// Configure env
dotenv.config();

// Database config
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/students", studentRoute);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to PMS",
    });
});

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
