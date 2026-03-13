import Razorpay from 'razorpay';
import crypto from 'crypto';
import CourseEnrollment from '../models/CourseEnrollment.js';
import User from '../models/User.js';
import Meeting from '../models/Meeting.js';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { userId, courseId, courseTitle, amount } = req.body;

        if (!userId || !courseId || !amount) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Amount in Paise (INR)
        const options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save initial enrollment as pending
        const newEnrollment = new CourseEnrollment({
            userId: req.user._id, // User from auth middleware
            courseId,
            courseTitle,
            amount,
            razorpayOrderId: order.id,
            status: 'pending'
        });

        await newEnrollment.save();

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            }
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const {
            paymentId,
            orderId,
            signature
        } = req.body;

        // Verify signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(orderId + "|" + paymentId);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Find and update enrollment
        const enrollment = await CourseEnrollment.findOne({ razorpayOrderId: orderId });
        
        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        enrollment.status = 'completed';
        enrollment.razorpayPaymentId = paymentId;
        enrollment.razorpaySignature = signature;
        
        await enrollment.save();

        res.status(200).json({
            success: true,
            message: "Enrollment successful",
            enrollment
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getMyCourses = async (req, res) => {
    try {
        const enrollments = await CourseEnrollment.find({ 
            userId: req.user._id,
            status: 'completed'
        });
        res.status(200).json({
            success: true,
            enrollments
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const enrollment = await CourseEnrollment.findOne({
            userId: req.user._id,
            courseId: courseId,
            status: 'completed'
        });
        
        res.status(200).json({
            success: true,
            isEnrolled: !!enrollment
        });
    } catch (error) {
        console.error("Error checking enrollment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getCourseMeeting = async (req, res) => {
    try {
        const { courseId } = req.params;
        const meeting = await Meeting.findOne({ courseId });
        
        if (!meeting) {
            return res.status(200).json({ success: true, meeting: null });
        }

        res.status(200).json({
            success: true,
            meeting: {
                link: meeting.meetingLink,
                startTime: meeting.startTime,
                courseTitle: meeting.courseTitle
            }
        });
    } catch (error) {
        console.error("Error fetching course meeting:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

