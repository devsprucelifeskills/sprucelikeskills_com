
import express from 'express';
import { createOrder, enrollCourse, getMyCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/enroll-course', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);

export default router;

