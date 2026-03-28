import express from 'express';
import { applyForCourse, getAllApplications, updateApplicationStatus, getMyApplicationStatus, getMyApplications } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Apply for a course
router.post('/apply', applyForCourse);

// Student: Check my application status (all)
router.get('/my', protect, getMyApplications);

// Student: Check my application status (specific course)
router.get('/check-status/:courseSlug', protect, getMyApplicationStatus);

// Admin: Get all applications
router.get('/admin', protect, authorize('admin'), getAllApplications);

// Admin: Update application status
router.put('/admin/:id', protect, authorize('admin'), updateApplicationStatus);


export default router;
