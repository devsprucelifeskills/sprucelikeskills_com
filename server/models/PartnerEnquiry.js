import mongoose from 'mongoose';

const partnerEnquirySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobileNo: {
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
    requiredSkills: {
        type: String,
        trim: true,
        default: ''
    },
    numberOfOpenings: {
        type: Number,
        default: null
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
    collection: 'partner_enquiries'
});

const PartnerEnquiry = mongoose.model('PartnerEnquiry', partnerEnquirySchema);

export default PartnerEnquiry;
