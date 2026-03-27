import Enquiry from '../models/Enquiry.js';

export const createEnquiry = async (req, res) => {
    try {
        const { name, contact, message, courseName } = req.body;

        if (!name || !contact || !message) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newEnquiry = new Enquiry({
            name,
            contact,
            message,
            courseName: courseName || ''
        });

        await newEnquiry.save();

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
