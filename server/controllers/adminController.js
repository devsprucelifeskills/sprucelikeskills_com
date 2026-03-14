import User from '../models/User.js';
import CourseEnrollment from '../models/CourseEnrollment.js';
import Enquiry from '../models/Enquiry.js';
import PartnerEnquiry from '../models/PartnerEnquiry.js';
import Meeting from '../models/Meeting.js';

// GET /api/v2/admin/stats
export const getStats = async (req, res) => {
    try {
        const [userCount, enrollmentCount, enquiryCount, partnerEnquiryCount] = await Promise.all([
            User.countDocuments(),
            CourseEnrollment.countDocuments({ status: 'completed' }),
            Enquiry.countDocuments(),
            PartnerEnquiry.countDocuments(),
        ]);

        const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
        const newPartnerEnquiries = await PartnerEnquiry.countDocuments({ status: 'new' });

        res.status(200).json({
            success: true,
            stats: {
                users: userCount,
                enrollments: enrollmentCount,
                enquiries: enquiryCount,
                partnerEnquiries: partnerEnquiryCount,
                newEnquiries,
                newPartnerEnquiries,
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/users
export const getAllUsers = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 20 } = req.query;
        const query = search
            ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
            : {};

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({ success: true, users, total, page: Number(page), limit: Number(limit) });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// PUT /api/v2/admin/users/:id/role
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['student', 'trainer', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// DELETE /api/v2/admin/users/:id
export const deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/enrollments
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await CourseEnrollment.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, enrollments });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/enquiries
export const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, enquiries });
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// PATCH /api/v2/admin/enquiries/:id
export const updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['new', 'contacted', 'closed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' });
        }

        res.status(200).json({ success: true, enquiry });
    } catch (error) {
        console.error('Error updating enquiry:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/partner-enquiries
export const getAllPartnerEnquiries = async (req, res) => {
    try {
        const enquiries = await PartnerEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, enquiries });
    } catch (error) {
        console.error('Error fetching partner enquiries:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// PATCH /api/v2/admin/partner-enquiries/:id
export const updatePartnerEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['new', 'contacted', 'closed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const enquiry = await PartnerEnquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Partner enquiry not found' });
        }

        res.status(200).json({ success: true, enquiry });
    } catch (error) {
        console.error('Error updating partner enquiry:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/meetings
export const getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find().sort({ startTime: -1 });
        res.status(200).json({ success: true, meetings });
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// POST /api/v2/admin/meetings
export const upsertMeeting = async (req, res) => {
    try {
        const { courseId, courseTitle, meetingLink, startTime } = req.body;

        if (!courseId || !courseTitle || !meetingLink || !startTime) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const meeting = await Meeting.findOneAndUpdate(
            { courseId },
            { courseTitle, meetingLink, startTime: new Date(startTime) },
            { upsert: true, returnDocument: 'after' }
        );

        res.status(200).json({ success: true, meeting });
    } catch (error) {
        console.error('Error upserting meeting:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// DELETE /api/v2/admin/meetings/:id
export const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!meeting) {
            return res.status(404).json({ success: false, message: 'Meeting not found' });
        }
        res.status(200).json({ success: true, message: 'Meeting deleted successfully' });
    } catch (error) {
        console.error('Error deleting meeting:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// GET /api/v2/admin/unique-courses
export const getUniqueCourses = async (req, res) => {
    try {
        const courses = await CourseEnrollment.aggregate([
            {
                $group: {
                    _id: "$courseId",
                    courseTitle: { $first: "$courseTitle" }
                }
            },
            {
                $project: {
                    _id: 0,
                    courseId: "$_id",
                    courseTitle: 1
                }
            },
            { $sort: { courseTitle: 1 } }
        ]);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching unique courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


