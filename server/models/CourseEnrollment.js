import mongoose from 'mongoose';

const courseEnrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'course_enrollment'
});

const CourseEnrollment = mongoose.model('CourseEnrollment', courseEnrollmentSchema);

export default CourseEnrollment;
