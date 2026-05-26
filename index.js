import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import appointmentRouter from "./routes/appointmentRouter.js";
import inquiryRouter from "./routes/inquireyRouter.js";
import studentRouter from "./routes/studentRouter.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    let token = req.headers.authorization;
    

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            
            if (err || decoded == null) {
                return res.status(401).json({ success: false, message: "Unauthorized access" });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        next();
    }
});

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Databace Connected");
    }
).catch(
    (err) => {
        console.log("Database Connection Failed");
        console.log(err);
    }
);

app.use("/api/users", userRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/students", studentRouter);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});