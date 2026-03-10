import PartnerEnquiry from '../models/PartnerEnquiry.js';

export const createPartnerEnquiry = async (req, res) => {
    try {
        const { companyName, name, mobileNo, email, requiredSkills, numberOfOpenings } = req.body;

        if (!companyName || !name || !mobileNo || !email) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newEnquiry = new PartnerEnquiry({
            companyName,
            name,
            mobileNo,
            email,
            requiredSkills: requiredSkills || '',
            numberOfOpenings: numberOfOpenings ? Number(numberOfOpenings) : null
        });

        await newEnquiry.save();

        res.status(201).json({
            success: true,
            message: "Partner enquiry submitted successfully",
            enquiry: newEnquiry
        });
    } catch (error) {
        console.error("Error creating partner enquiry:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
