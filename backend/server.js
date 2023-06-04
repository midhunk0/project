import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
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
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use("/api/students", studentRoute);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to PMS",
    });
});
 
//to handle errors
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage, 
        stack:err.stack,
    })
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});

