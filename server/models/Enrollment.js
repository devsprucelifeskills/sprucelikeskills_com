import mongoose from 'mongoose';

const installmentSchema = new mongoose.Schema({
    dueDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    paidAt: {
        type: Date
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'offline', 'razorpay', 'system_auto'],
        default: 'online'
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    }
});

const reviewSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    addedBy: { type: String, default: 'Admin' },
    action: { type: String } // e.g., 'Created', 'Marked Paid', 'Updated EMI'
});

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseSlug: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    discount: {
        amount: { type: Number, default: 0 },
        title: { type: String, default: 'Scholarship' }
    },
    payableAmount: {
        type: Number,
        required: true
    },
    installments: [installmentSchema],
    reviews: [reviewSchema],
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAutoBlockEnabled: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['active', 'awaiting-payment', 'completed', 'cancelled'],
        default: 'awaiting-payment'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'enrollments'
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
