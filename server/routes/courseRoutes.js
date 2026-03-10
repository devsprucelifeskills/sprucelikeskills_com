
import express from 'express';
import { createOrder, enrollCourse, getMyCourses, checkEnrollment } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/enroll-course', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);
router.get('/check-enrollment/:courseId', protect, checkEnrollment);

export default router;

