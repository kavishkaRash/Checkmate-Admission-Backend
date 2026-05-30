import express from "express";
import { getDashboardData } from "../controller/adminController.js";


const adminRouter = express.Router();

adminRouter.get("/", getDashboardData);

export default adminRouter;