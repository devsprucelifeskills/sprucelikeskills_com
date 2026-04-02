import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'trainer', 'admin'],
        default: 'student'
    },
    profileImage: {
        type: String
    },
    enrolledCourses: [{
        type: String // Slugs of courses enrolled
    }],
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

export default User;
