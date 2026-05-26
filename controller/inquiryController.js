import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getDesignedEmailInquiries } from "../lib/getDesignedEmailInquiries.js";


dotenv.config();

export async function sendInquiry(req, res) {
    try {
        const { fullName, email, phoneNumber, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const emailHtml = getDesignedEmailInquiries({
            fullName,
            email,
            phoneNumber,
            subject,
            message
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `✨ New Inquiry: ${fullName} | ${subject}`,
            html: emailHtml
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}