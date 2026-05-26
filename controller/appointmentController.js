import Appointment from "../models/appointment.js";
import { isAdmin } from "./userController.js";


export async function createAppointment(req,res) {
    console.log("Hello World")
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.json({
            message : "Appointment Created Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Failed To Create Appointment"
        });
    }
}

export async function getAllAppointments(req,res) {
    try {
        const appointments = await Appointment.find().sort({createdAt : -1});
        res.json(appointments);
    } catch (error) {
        res.status(500).json({
            message : "Failed To Get Appointments"
        });
    }
}



export async function updateAppointmentStatus(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "You are not authorized to update appointment status" });
    }

    const appointmentID = req.params.id; 
    const newStatus = req.body.status;

    try {
        const updated = await Appointment.findByIdAndUpdate( 
            appointmentID,
            { status: newStatus },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Appointment Not Found" });
        }

        res.json({ message: "Appointment Status Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed To Update Appointment Status" });
    }
}