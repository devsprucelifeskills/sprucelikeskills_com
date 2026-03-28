import Enrollment from '../models/Enrollment.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import CourseSettings from '../models/CourseSettings.js';
import Razorpay from 'razorpay';
import { sendEnrollmentEmail, sendCourseFullyPaidEmail } from '../utils/emailService.js';

import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID?.trim(),
    key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
});


// @desc    Setup official enrollment (Admin logic)
// @route   POST /api/v2/admin/enrollments/setup
// @access  Private/Admin
export const setupEnrollment = async (req, res) => {
    try {
        const {
            userId,
            courseSlug,
            courseTitle,
            totalFee,
            discountAmount,
            discountTitle,
            installmentsCount,
            startDate,
            intervalDays,
            mode = 'auto',
            manualInstallments = [],
            reviewMessage
        } = req.body;

        if (!userId || !courseSlug || !totalFee) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Prevent duplicate enrollments
        const existingEnrollment = await Enrollment.findOne({
            userId,
            courseSlug,
            status: { $in: ['active', 'awaiting-payment'] }
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "An active or pending enrollment already exists for this user and course."
            });
        }

        const payableAmount = totalFee - (discountAmount || 0);
        let installments = [];

        if (mode === 'manual' && manualInstallments.length > 0) {
            // Validate manual total matches payableAmount
            const manualTotal = manualInstallments.reduce((sum, inst) => sum + Number(inst.amount), 0);
            // Relaxed check (maybe allowance for small discrepancies or rounding)
            if (Math.abs(manualTotal - payableAmount) > 1) {
                return res.status(400).json({ success: false, message: "Total manual installment amounts must equal payable amount" });
            }
            installments = manualInstallments.map(inst => ({
                dueDate: new Date(inst.dueDate),
                amount: inst.amount,
                status: 'pending'
            }));
        } else {
            const installmentAmount = Math.floor(payableAmount / (installmentsCount || 1));
            let currentDueDate = new Date(startDate || Date.now());

            for (let i = 0; i < (installmentsCount || 1); i++) {
                installments.push({
                    dueDate: new Date(currentDueDate),
                    amount: i === (installmentsCount - 1)
                        ? payableAmount - (installmentAmount * (installmentsCount - 1)) // Adjustment for rounding
                        : installmentAmount,
                    status: 'pending'
                });
                // Increment date for next installment
                currentDueDate.setDate(currentDueDate.getDate() + (intervalDays || 30));
            }
        }

        const newEnrollment = new Enrollment({
            userId,
            courseSlug,
            courseTitle,
            totalFee,
            discount: {
                amount: discountAmount || 0,
                title: discountTitle || 'Scholarship'
            },
            payableAmount,
            installments,
            status: 'awaiting-payment',
            reviews: [{ 
                message: reviewMessage || 'System: Enrollment schedule initially generated.', 
                action: `Created Enrollment (Fee: ₹${payableAmount}, EMIs: ${installments.length})` 
            }]
        });

        await newEnrollment.save();

        // Optionally update User model's enrolledCourses if not already present
        const user = await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: courseSlug }
        }, { new: true });

        // Send enrollment confirmation email
        if (user && user.email) {
            try {
                await sendEnrollmentEmail(user.email, user.name, newEnrollment);
            } catch (emailError) {
                console.error("Non-blocking error sending enrollment email:", emailError);
                // We don't fail the response if the email fails
            }
        }

        res.status(201).json({
            success: true,
            message: "Enrollment created successfully with EMI schedule",
            enrollment: newEnrollment
        });
    } catch (error) {
        console.error("Error in setupEnrollment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Get all enrollments (Admin)
// @route   GET /api/v2/admin/enrollments
// @access  Private/Admin
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('userId', 'name email').sort({ createdAt: -1 });

        // Self-healing and calculation
        const enhancedEnrollments = [];
        for (let e of enrollments) {
            const hasPaid = e.installments.some(inst => inst.status === 'paid');
            let needsSave = false;

            // Fix any stuck awaiting-payment statuses
            if (e.status === 'awaiting-payment' && hasPaid) {
                e.status = 'active';
                needsSave = true;
            }

            // Fix any missing completed statuses
            const hasPending = e.installments.some(inst => inst.status === 'pending');
            if (hasPaid && !hasPending && e.status !== 'completed') {
                e.status = 'completed';
                needsSave = true;
            }

            if (needsSave) await e.save();

            const now = new Date();
            const hasOverdue = e.installments.some(inst => 
                inst.status === 'pending' && new Date(inst.dueDate) < now
            );

            let calcStatus = 'active';
            let reason = '';

            if (e.isBlocked) {
                calcStatus = 'blocked';
                reason = 'Manual Block';
            } else if (e.isAutoBlockEnabled && hasOverdue) {
                calcStatus = 'auto-blocked';
                reason = 'Overdue EMI';
            }

            enhancedEnrollments.push({
                ...e.toObject(),
                calculatedStatus: calcStatus,
                blockReason: reason,
                hasOverdue,
                somePaid: hasPaid // Convenient for UI
            });
        }

        res.status(200).json({ success: true, enrollments: enhancedEnrollments });
    } catch (error) {
        console.error("Error in getAllEnrollments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Mark installment as paid (Manual/Offline)
// @route   PUT /api/v2/admin/enrollments/:id/installments/:installmentId/pay
// @access  Private/Admin
export const markPaidManual = async (req, res) => {
    try {
        const { id, installmentId } = req.params;
        const { amountPaid, reviewMessage } = req.body;
        const enrollment = await Enrollment.findById(id);

        if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

        const inst = enrollment.installments.id(installmentId);
        if (!inst) return res.status(404).json({ success: false, message: "Installment not found" });

        const originalAmount = inst.amount;
        const actualPaid = amountPaid !== undefined ? Number(amountPaid) : originalAmount;
        const diff = originalAmount - actualPaid;

        // Mark as paid
        inst.status = 'paid';
        inst.paidAt = new Date();
        inst.paymentMethod = 'offline';
        inst.amount = actualPaid;

        // If there's a difference and there are remaining pending installments, redistribute it
        if (diff !== 0) {
            const currentIdx = enrollment.installments.findIndex(i => i._id.toString() === installmentId);
            const remainingPending = enrollment.installments.slice(currentIdx + 1).filter(i => i.status === 'pending');

            if (remainingPending.length > 0) {
                const perEMI = Math.floor(diff / remainingPending.length);
                remainingPending.forEach((p, idx) => {
                    const adjustment = idx === remainingPending.length - 1
                        ? diff - (perEMI * (remainingPending.length - 1))
                        : perEMI;
                    p.amount = Math.max(0, p.amount + adjustment);
                });
            }
        }

        // If this is the first payment and enrollment is awaiting-payment, activate it
        if (enrollment.status === 'awaiting-payment') {
            enrollment.status = 'active';
        }

        // Auto-clear any 0 amount installments (e.g. from overpayment redistribution)
        enrollment.installments.forEach(i => {
            if (i.amount === 0 && i.status === 'pending') {
                i.status = 'paid';
                i.paidAt = new Date();
                i.paymentMethod = 'system_auto';
            }
        });

        const wasAlreadyCompleted = enrollment.status === 'completed';

        // Check if all installments are paid to mark as completed
        const allPaid = enrollment.installments.every(inst => inst.status === 'paid');
        if (allPaid) {
            enrollment.status = 'completed';
        }

        const currentIdx = enrollment.installments.findIndex(i => i._id.toString() === installmentId);

        const actionText = diff !== 0 
            ? `Marked EMI #${currentIdx + 1} paid: ₹${actualPaid} (Original: ₹${originalAmount})`
            : `Marked EMI #${currentIdx + 1} paid: ₹${actualPaid}`;

        enrollment.reviews.push({
            message: reviewMessage || 'System: Payment recorded by admin without additional notes.',
            action: actionText
        });

        await enrollment.save();

        if (allPaid && !wasAlreadyCompleted) {
            const user = await User.findById(enrollment.userId);
            if (user && user.email) {
                sendCourseFullyPaidEmail(user.email, user.name, enrollment).catch(console.error);
            }
        }

        res.status(200).json({ success: true, message: "Installment marked as paid and balance redistributed", enrollment });
    } catch (error) {
        console.error("Error in markPaidManual:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Toggle block status
// @route   PUT /api/v2/admin/enrollments/:id/toggle-block
// @access  Private/Admin
export const toggleBlockStatus = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

        enrollment.isBlocked = !enrollment.isBlocked;
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: `User ${enrollment.isBlocked ? 'blocked' : 'unblocked'} successfully`,
            isBlocked: enrollment.isBlocked
        });
    } catch (error) {
        console.error("Error in toggleBlockStatus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Explicitly unblock a student (removes manual & auto block)
// @route   PUT /api/v2/admin/enrollments/:id/unblock
// @access  Private/Admin
export const unblockStudent = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

        enrollment.isBlocked = false;
        enrollment.isAutoBlockEnabled = false;
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: "Student unblocked successfully",
            isBlocked: false,
            isAutoBlockEnabled: false
        });
    } catch (error) {
        console.error("Error in unblockStudent:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Toggle auto-block status
// @route   PUT /api/v2/admin/enrollments/:id/toggle-auto-block
// @access  Private/Admin
export const toggleAutoBlockStatus = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

        enrollment.isAutoBlockEnabled = !enrollment.isAutoBlockEnabled;
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: `Auto-block ${enrollment.isAutoBlockEnabled ? 'enabled' : 'disabled'} successfully`,
            isAutoBlockEnabled: enrollment.isAutoBlockEnabled
        });
    } catch (error) {
        console.error("Error in toggleAutoBlockStatus:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// @desc    Update EMI schedule for remaining balance
// @route   PUT /api/v2/admin/enrollments/:id/update-emi
// @access  Private/Admin
export const updateEmiSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { newInstallments, reviewMessage } = req.body;

        if (!Array.isArray(newInstallments) || newInstallments.length === 0) {
            return res.status(400).json({ success: false, message: "New installments array is required" });
        }

        const enrollment = await Enrollment.findById(id);
        if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

        // Calculate paid amount
        const paidInstallments = enrollment.installments.filter(inst => inst.status === 'paid');
        const paidAmount = paidInstallments.reduce((sum, inst) => sum + Number(inst.amount), 0);

        // Calculate remaining balance
        const balance = enrollment.payableAmount - paidAmount;

        // Calculate sum of new installments
        const newTotal = newInstallments.reduce((sum, inst) => sum + Number(inst.amount), 0);

        // Validate that newTotal makes sense against balance
        if (Math.abs(newTotal - balance) > 1) {
            return res.status(400).json({
                success: false,
                message: `Sum of new installments (${newTotal}) must exactly equal the remaining balance (${balance})`
            });
        }

        // Format new installments
        const formattedNewInstallments = newInstallments.map(inst => ({
            amount: Number(inst.amount),
            dueDate: new Date(inst.dueDate),
            status: 'pending'
        }));

        // Replace pending installments with the new ones, keeping paid ones intact
        enrollment.installments = [...paidInstallments, ...formattedNewInstallments];

        // Auto-clear any 0 amount installments just in case admin manually configured a 0 amount
        enrollment.installments.forEach(i => {
            if (i.amount === 0 && i.status === 'pending') {
                i.status = 'paid';
                i.paidAt = new Date();
                i.paymentMethod = 'system_auto';
            }
        });

        const wasAlreadyCompleted = enrollment.status === 'completed';

        // If it was completed/awaiting-payment but now has new pending payments AND some paid ones, switch to active
        const hasPaid = enrollment.installments.some(inst => inst.status === 'paid');
        const hasPending = enrollment.installments.some(inst => inst.status === 'pending');

        if (hasPaid && !hasPending) {
            enrollment.status = 'completed';
        } else if (hasPaid && (enrollment.status === 'completed' || enrollment.status === 'awaiting-payment')) {
            enrollment.status = 'active';
        }

        enrollment.reviews.push({
            message: reviewMessage || 'System: EMI schedule was restructured by admin without additional notes.',
            action: `Updated Schedule (Reconfigured Balance: ₹${newTotal} into ${newInstallments.length} EMIs)`
        });

        await enrollment.save();

        if (enrollment.status === 'completed' && !wasAlreadyCompleted) {
            const user = await User.findById(enrollment.userId);
            if (user && user.email) {
                sendCourseFullyPaidEmail(user.email, user.name, enrollment).catch(console.error);
            }
        }

        res.status(200).json({
            success: true,
            message: "EMI schedule updated successfully",
            enrollment
        });

    } catch (error) {
        console.error("Error in updateEmiSchedule:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Get my enrollments (Student)
// @route   GET /api/v2/enrollments/my
// @access  Private
export const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user._id });

        const enhancedEnrollments = [];
        for (let e of enrollments) {
            const hasPaid = e.installments.some(inst => inst.status === 'paid');
            let needsSave = false;

            // Fix stuck status
            if (e.status === 'awaiting-payment' && hasPaid) {
                e.status = 'active';
                needsSave = true;
            }
            const hasPending = e.installments.some(inst => inst.status === 'pending');
            if (hasPaid && !hasPending && e.status !== 'completed') {
                e.status = 'completed';
                needsSave = true;
            }

            if (needsSave) await e.save();

            const now = new Date();
            const hasOverdue = e.installments.some(inst =>
                inst.status === 'pending' && new Date(inst.dueDate) < now
            );

            // Override `isBlocked` to true if auto-blocked so frontend catches it naturally
            const effectivelyBlocked = e.isBlocked || (e.isAutoBlockEnabled && hasOverdue);

            enhancedEnrollments.push({
                ...e.toObject(),
                isBlocked: effectivelyBlocked,
                manualBlock: e.isBlocked,
                autoBlockTriggered: (e.isAutoBlockEnabled && hasOverdue)
            });
        }

        res.status(200).json({ success: true, enrollments: enhancedEnrollments });
    } catch (error) {
        console.error("Error in getMyEnrollments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Get course settings (for Admin to auto-fill)
// @route   GET /api/v2/admin/course-settings/:slug
// @access  Private/Admin
export const getCourseSettings = async (req, res) => {
    try {
        const settings = await CourseSettings.findOne({ courseSlug: req.params.slug });
        res.status(200).json({ success: true, settings });
    } catch (error) {
        console.error("Error in getCourseSettings:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// @desc    Create Razorpay order for installment
// @route   POST /api/v2/enrollments/:id/installments/:installmentId/create-order
// @access  Private
export const createInstallmentOrder = async (req, res) => {
    try {
        const { id, installmentId } = req.params;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(installmentId)) {
            return res.status(400).json({ success: false, message: "Invalid enrollment or installment ID" });
        }

        const enrollment = await Enrollment.findOne({ _id: id, userId: req.user._id });

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        const inst = enrollment.installments.id(installmentId);
        if (!inst) {
            return res.status(404).json({ success: false, message: "Installment not found" });
        }
        if (inst.status === 'paid') {
            return res.status(400).json({ success: false, message: "Installment already paid" });
        }

        const options = {
            amount: Math.round(inst.amount * 100), // in paise, ensure integer
            currency: "INR",
            receipt: `${installmentId}_${Date.now()}`, // Removed 'inst_' to stay under 40 chars
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            }
        });
    } catch (error) {
        console.error("Error in createInstallmentOrder:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc    Verify installment payment
// @route   POST /api/v2/enrollments/:id/installments/:installmentId/verify-payment
// @access  Private
export const verifyInstallmentPayment = async (req, res) => {
    try {
        const { id, installmentId } = req.params;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(installmentId)) {
            return res.status(400).json({ success: false, message: "Invalid enrollment or installment ID" });
        }

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET?.trim());
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        const enrollment = await Enrollment.findOne({ _id: id, userId: req.user._id });
        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" });
        }

        const inst = enrollment.installments.id(installmentId);
        if (!inst) {
            return res.status(404).json({ success: false, message: "Installment not found" });
        }

        inst.status = 'paid';
        inst.paidAt = new Date();
        inst.paymentMethod = 'razorpay';
        inst.razorpayPaymentId = razorpay_payment_id;

        // If this is the first payment and enrollment is awaiting-payment, activate it
        if (enrollment.status === 'awaiting-payment') {
            enrollment.status = 'active';
        }

        // Auto-clear any 0 amount installments
        enrollment.installments.forEach(i => {
            if (i.amount === 0 && i.status === 'pending') {
                i.status = 'paid';
                i.paidAt = new Date();
                i.paymentMethod = 'system_auto';
            }
        });
        
        const wasAlreadyCompleted = enrollment.status === 'completed';

        // Check if all installments are paid to mark as completed
        const allPaid = enrollment.installments.every(inst => inst.status === 'paid');
        if (allPaid) {
            enrollment.status = 'completed';
        }

        await enrollment.save();

        if (allPaid && !wasAlreadyCompleted) {
            const user = await User.findById(enrollment.userId);
            if (user && user.email) {
                sendCourseFullyPaidEmail(user.email, user.name, enrollment).catch(console.error);
            }
        }

        res.status(200).json({ success: true, message: "Payment verified and installment updated", enrollment });
    } catch (error) {
        console.error("Error in verifyInstallmentPayment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
