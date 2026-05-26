import express from "express";
import { createAppointment, getAllAppointments, updateAppointmentStatus} from "../controller/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/create", createAppointment);
appointmentRouter.get("/all", getAllAppointments);
appointmentRouter.put("/status/:id", updateAppointmentStatus);

export default appointmentRouter;