import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    courseSlug: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'enrolled', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'applications'
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
