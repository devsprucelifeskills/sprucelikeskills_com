import mongoose from 'mongoose';

const courseSettingsSchema = new mongoose.Schema({
    courseSlug: {
        type: String,
        required: true,
        unique: true
    },
    defaultTotalFee: {
        type: Number,
        required: true
    },
    defaultInstallmentCount: {
        type: Number,
        default: 1
    },
    installmentIntervalDays: {
        type: Number,
        default: 30
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'course_settings'
});

const CourseSettings = mongoose.model('CourseSettings', courseSettingsSchema);

export default CourseSettings;
