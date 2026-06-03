import Enquiry from '../models/Enquiry.js';
import { sendEnquiryNotificationEmail } from '../utils/emailService.js';

export const createEnquiry = async (req, res) => {
    try {
        const { name, mobile, email, message, courseName, city } = req.body;

        if (!name || !mobile || !message) {
            return res.status(400).json({ success: false, message: "Name, mobile number, and message are required fields." });
        }

        const newEnquiry = new Enquiry({
            name,
            mobile,
            email: email || '',
            message,
            courseName: courseName || '',
            city: city || ''
        });

        await newEnquiry.save();

        // Send Email Notification to Admin
        await sendEnquiryNotificationEmail({
            name,
            mobile,
            email: email || '',
            message,
            courseName: courseName || '',
            city: city || ''
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiry: newEnquiry
        });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            enquiries
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
