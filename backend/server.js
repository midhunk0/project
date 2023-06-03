import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

//configure env
dotenv.config();

//database config
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

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
