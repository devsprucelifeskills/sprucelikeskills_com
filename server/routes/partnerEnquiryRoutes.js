import express from 'express';
import { createPartnerEnquiry } from '../controllers/partnerEnquiryController.js';

const router = express.Router();

router.post('/submit', createPartnerEnquiry);

export default router;
