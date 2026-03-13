import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    meetingLink: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: 'meetings'
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
