// routes/studentRoutes.js
import express from "express";
import {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controller/studentController.js";

const studentRouter = express.Router();

studentRouter.post("/", addStudent);
studentRouter.get("/", getStudents);
studentRouter.get("/:id", getStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;