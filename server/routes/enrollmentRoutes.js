import express from 'express';
import { 
    setupEnrollment,
    getAllEnrollments,
    markPaidManual,
    toggleBlockStatus,
    toggleAutoBlockStatus,
    getMyEnrollments,
    getCourseSettings,
    createInstallmentOrder,
    verifyInstallmentPayment,
    updateEmiSchedule,
    unblockStudent
} from '../controllers/enrollmentController.js';



import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Student: Get my enrollments & pay installments
router.get('/my', protect, getMyEnrollments);
router.post('/:id/installments/:installmentId/create-order', protect, createInstallmentOrder);
router.post('/:id/installments/:installmentId/verify-payment', protect, verifyInstallmentPayment);


// Admin: Setup enrollment (EMI)
router.post('/admin/setup', protect, authorize('admin'), setupEnrollment);

// Admin: Get all enrollments
router.get('/admin/all', protect, authorize('admin'), getAllEnrollments);

// Admin: Mark installment as paid manually
router.put('/admin/:id/installments/:installmentId/pay', protect, authorize('admin'), markPaidManual);

// Admin: Toggle block status
router.put('/admin/:id/toggle-block', protect, authorize('admin'), toggleBlockStatus);

// Admin: Toggle auto-block status
router.put('/admin/:id/toggle-auto-block', protect, authorize('admin'), toggleAutoBlockStatus);

// Admin: Unblock student (disables both manual and auto blocks)
router.put('/admin/:id/unblock', protect, authorize('admin'), unblockStudent);

// Admin: Get course settings
router.get('/admin/course-settings/:slug', protect, authorize('admin'), getCourseSettings);

// Admin: Update EMI Schedule (Remaining Balance)
router.put('/admin/:id/update-emi', protect, authorize('admin'), updateEmiSchedule);


export default router;
