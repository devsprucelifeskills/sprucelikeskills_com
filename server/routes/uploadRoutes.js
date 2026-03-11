import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/profile-image', upload.single('image'), async (req, res) => {
    try {
        console.log('--- Upload Request Received ---');
        if (!req.file) {
            console.log('Error: No file in request');
            return res.status(400).json({ message: 'No file uploaded' });
        }


        // Convert buffer to base64 for Cloudinary
        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        console.log('Uploading to Cloudinary...');
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: 'profile',
            resource_type: 'auto'
        });

        // console.log('Cloudinary response received:', result.secure_url);

        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

export default router;
