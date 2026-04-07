import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getEnrollmentTemplate, getCourseFullyPaidTemplate, getOTPTemplate, getNewUserWelcomeTemplate } from './emailTemplates.js';

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

/**
 * Send Course Fully Paid Email
 * @param {string} toEmail 
 * @param {string} userName 
 * @param {object} enrollment 
 */
export const sendCourseFullyPaidEmail = async (toEmail, userName, enrollment) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing. Fully paid email could not be sent.");
            return { success: false, message: "API key missing" };
        }

        const { courseTitle, payableAmount } = enrollment;

        const html = getCourseFullyPaidTemplate(
            userName,
            courseTitle,
            payableAmount,
            process.env.FRONTEND_URL || "www.sprucelifeskills.com"
        );

        const data = await resend.emails.send({
            from: 'hello@sprucelifeskills.com', // Replace with your verified domain in production
            to: [toEmail],
            subject: `Payment Complete: ${courseTitle} 🎉`,
            html: html,
        });

        console.log(`Fully Paid Email sent successfully to ${toEmail}:`, data.id);
        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error sending fully paid email:", error);
        return { success: false, error: error.message };
    }
};

/**
  * Send OTP for Password Reset
  * @param {string} toEmail 
  * @param {string} userName 
  * @param {string} otp 
  */
 export const sendOTPEmail = async (toEmail, userName, otp) => {
     try {
         if (!process.env.RESEND_API_KEY) {
             console.warn("RESEND_API_KEY is missing. OTP email could not be sent.");
             return { success: false, message: "API key missing" };
         }
 
         const html = getOTPTemplate(
             userName,
             otp,
             process.env.FRONTEND_URL || "www.sprucelifeskills.com"
         );
 
         const data = await resend.emails.send({
             from: 'hello@sprucelifeskills.com', // Replace with your verified domain in production
             to: [toEmail],
             subject: `Password Reset Verification Code: ${otp}`,
             html: html,
         });
 
         console.log(`OTP Email sent successfully to ${toEmail}:`, data.id);
         return { success: true, id: data.id };
     } catch (error) {
         console.error("Error sending OTP email:", error);
         return { success: false, error: error.message };
     }
 };

/**
 * Send Welcome Email to Admin-Created User with Login Credentials
 * @param {string} toEmail
 * @param {string} userName
 * @param {string} password  - plain-text password before hashing
 * @param {string} role
 */
export const sendNewUserWelcomeEmail = async (toEmail, userName, password, role) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Welcome email could not be sent.');
            return { success: false, message: 'API key missing' };
        }

        const html = getNewUserWelcomeTemplate(
            userName,
            toEmail,
            password,
            role,
            process.env.FRONTEND_URL || 'https://www.sprucelifeskills.com'
        );

        const data = await resend.emails.send({
            from: 'hello@sprucelifeskills.com',
            to: [toEmail],
            subject: `Welcome to Spruce Life Skills — Your Account is Ready!`,
            html,
        });

        console.log(`Welcome email sent to ${toEmail}:`, data.id);
        return { success: true, id: data.id };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};
