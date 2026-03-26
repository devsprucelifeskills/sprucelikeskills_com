import Application from '../models/Application.js';

// @desc    Apply for a course
// @route   POST /api/v2/applications/apply
// @access  Public (or semi-private)
export const applyForCourse = async (req, res) => {
    try {
        const { name, email, contact, courseSlug, courseTitle } = req.body;

        if (!name || !email || !contact || !courseSlug || !courseTitle) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newApplication = new Application({
            name,
            email,
            contact,
            courseSlug,
            courseTitle,
            status: 'pending'
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully! Our team will contact you soon."
        });
    } catch (error) {
        console.error("Error in applyForCourse:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Get all applications (Admin only)
// @route   GET /api/v2/admin/applications
// @access  Private/Admin
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error("Error in getAllApplications:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Update application status
// @route   PUT /api/v2/admin/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ success: true, message: `Application marked as ${status}`, application });
    } catch (error) {
        console.error("Error in updateApplicationStatus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Check application status for a specific course
// @route   GET /api/v2/applications/check-status/:courseSlug
// @access  Private
export const getMyApplicationStatus = async (req, res) => {
    try {
        const { courseSlug } = req.params;
        const email = req.user.email;

        const application = await Application.findOne({ email, courseSlug }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, application });
    } catch (error) {
        console.error("Error in getMyApplicationStatus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Get all applications for the logged-in user
// @route   GET /api/v2/applications/my
// @access  Private
export const getMyApplications = async (req, res) => {
    try {
        const email = req.user.email;

        const applications = await Application.find({ email }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error("Error in getMyApplications:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
