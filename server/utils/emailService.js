import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getEnrollmentTemplate } from './emailTemplates.js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send Enrollment Confirmation Email with EMI Chart
 * @param {string} toEmail 
 * @param {string} userName 
 * @param {object} enrollment 
 */
export const sendEnrollmentEmail = async (toEmail, userName, enrollment) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing. Email could not be sent.");
            return { success: false, message: "API key missing" };
        }

        const { courseTitle, installments, payableAmount } = enrollment;

        const html = getEnrollmentTemplate(
            userName,
            courseTitle,
            installments,
            payableAmount,
            process.env.FRONTEND_URL || "www.sprucelifeskills.com"
        );

        const data = await resend.emails.send({
            from: 'hello@sprucelifeskills.com', // Replace with your verified domain in production
            to: [toEmail],
            subject: `Enrollment Successful: ${courseTitle}`,
            html: html,
        });

        console.log(`Email sent successfully to ${toEmail}:`, data.id);
        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error sending enrollment email:", error);
        return { success: false, error: error.message };
    }
};
