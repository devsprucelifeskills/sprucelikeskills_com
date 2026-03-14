import express from 'express';
import {
    getStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllEnrollments,
    getAllEnquiries,
    updateEnquiryStatus,
    getAllPartnerEnquiries,
    updatePartnerEnquiryStatus,
    getAllMeetings,
    upsertMeeting,
    deleteMeeting,
    getUniqueCourses,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication + admin role
router.use(protect, authorize('admin'));

router.get('/stats', getStats);

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

router.get('/enrollments', getAllEnrollments);

router.get('/enquiries', getAllEnquiries);
router.patch('/enquiries/:id', updateEnquiryStatus);

router.get('/partner-enquiries', getAllPartnerEnquiries);
router.patch('/partner-enquiries/:id', updatePartnerEnquiryStatus);

router.get('/meetings', getAllMeetings);
router.post('/meetings', upsertMeeting);
router.delete('/meetings/:id', deleteMeeting);
router.get('/unique-courses', getUniqueCourses);

export default router;
