import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'enquiries'
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
