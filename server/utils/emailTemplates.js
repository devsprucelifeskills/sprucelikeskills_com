/**
 * Premium Email Templates for Spruce Life Skills
 */

export const getEnrollmentTemplate = (userName, courseTitle, installments, totalPayable, websiteUrl = "www.sprucelifeskills.com") => {
    const installmentRows = installments.map((inst, index) => `
        <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 12px; color: #4a5568;">Installment ${index + 1}</td>
            <td style="padding: 12px; color: #4a5568;">${new Date(inst.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
            <td style="padding: 12px; color: #2d3748; font-weight: 600;">₹${Number(inst.amount).toLocaleString('en-IN')}</td>
            <td style="padding: 12px;"><span style="background-color: #feebc8; color: #7b341e; padding: 4px 8px; border-radius: 9999px; font-size: 11px; text-transform: uppercase; font-weight: 700;">${inst.status}</span></td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrollment Successful - Spruce Life Skills</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7fafc; color: #2d3748;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Welcome to the Future!</h1>
                <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Enrollment Successful - ${courseTitle}</p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1a202c;">Hi ${userName},</h2>
                <p style="margin: 0 0 20px 0; line-height: 1.6; color: #4a5568;">Great news! Your application for <strong>${courseTitle}</strong> has been accepted. We are thrilled to have you join our community at Spruce Life Skills.</p>
                
                <p style="margin: 0 0 30px 0; line-height: 1.6; color: #4a5568;">Your enrollment has been set up with the following EMI (Equated Monthly Installment) plan. Please keep this for your records.</p>

                <!-- EMI Chart -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 700; color: #2d3748; text-transform: uppercase; letter-spacing: 0.05em;">Your EMI Schedule</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; text-align: left; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 12px; color: #718096; font-weight: 600;">ID</th>
                                <th style="padding: 12px; color: #718096; font-weight: 600;">Due Date</th>
                                <th style="padding: 12px; color: #718096; font-weight: 600;">Amount</th>
                                <th style="padding: 12px; color: #718096; font-weight: 600;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${installmentRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding: 15px 12px; text-align: right; font-weight: 700; color: #4a5568;">Total Payable:</td>
                                <td colspan="2" style="padding: 15px 12px; font-size: 18px; font-weight: 800; color: #764ba2;">₹${Number(totalPayable).toLocaleString('en-IN')}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Action Button -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <a href="${websiteUrl}/profile/my-courses" style="display: inline-block; padding: 16px 32px; background-color: #764ba2; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px; transition: background-color 0.2s;">Go to Dashboard</a>
                </div>

                <p style="margin: 0 0 10px 0; line-height: 1.6; color: #4a5568;">If you have any questions or need assistance with your payments, feel free to reply to this email or visit our website.</p>
                
                <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">
                
                <p style="margin: 0; font-size: 13px; color: #a0aec0; line-height: 1.6;">
                    <strong>Spruce Life Skills</strong><br>
                    Website: <a href="${websiteUrl}" style="color: #764ba2; text-decoration: none;">${websiteUrl.replace('https://', '')}</a><br>
                    Transforming Skills into Success.
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #a0aec0;">
                &copy; ${new Date().getFullYear()} Spruce Life Skills. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

export const getCourseFullyPaidTemplate = (userName, courseTitle, totalPaid, websiteUrl = "www.sprucelifeskills.com") => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Fully Paid - Spruce Life Skills</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7fafc; color: #2d3748;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Payment Complete! 🎉</h1>
                <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">${courseTitle}</p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1a202c;">Hi ${userName},</h2>
                <p style="margin: 0 0 20px 0; line-height: 1.6; color: #4a5568;">This email is to confirm that the total fee for your enrollment in <strong>${courseTitle}</strong> has been successfully and completely paid off!</p>
                
                <!-- Stats Box -->
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-bottom: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.05em;">Total Amount Paid</p>
                    <p style="margin: 0; font-size: 32px; font-weight: 800; color: #15803d;">₹${Number(totalPaid).toLocaleString('en-IN')}</p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: 600; color: #166534; background-color: #dcfce7; display: inline-block; padding: 4px 12px; border-radius: 20px;">✓ 0 Pending Dues</p>
                </div>

                <p style="margin: 0 0 30px 0; line-height: 1.6; color: #4a5568;">You have no remaining EMI installments for this course. Your access is fully secured. Keep learning and keep growing!</p>

                <!-- Action Button -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <a href="${websiteUrl}/profile/my-courses" style="display: inline-block; padding: 16px 32px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 16px; transition: background-color 0.2s;">Go to My Courses</a>
                </div>

                <p style="margin: 0 0 10px 0; line-height: 1.6; color: #4a5568;">If you have any questions or need assistance, feel free to reply to this email or visit our website.</p>
                
                <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">
                
                <p style="margin: 0; font-size: 13px; color: #a0aec0; line-height: 1.6;">
                    <strong>Spruce Life Skills</strong><br>
                    Website: <a href="${websiteUrl}" style="color: #10b981; text-decoration: none;">${websiteUrl.replace('https://', '')}</a><br>
                    Transforming Skills into Success.
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #a0aec0;">
                &copy; ${new Date().getFullYear()} Spruce Life Skills. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

export const getOTPTemplate = (userName, otp, websiteUrl = "www.sprucelifeskills.com") => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Spruce Life Skills</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7fafc; color: #2d3748;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Password Reset</h1>
                <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Spruce Life Skills Account</p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1a202c;">Hi ${userName},</h2>
                <p style="margin: 0 0 20px 0; line-height: 1.6; color: #4a5568;">We received a request to reset your password. Use the verification code below to continue. This code will expire in 10 minutes.</p>
                
                <!-- OTP Box -->
                <div style="background-color: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 8px; padding: 30px; margin-bottom: 30px; text-align: center;">
                    <span style="font-size: 36px; font-weight: 800; color: #764ba2; letter-spacing: 8px;">${otp}</span>
                </div>

                <p style="margin: 0 0 30px 0; line-height: 1.6; color: #4a5568;">If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

                <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">
                
                <p style="margin: 0; font-size: 13px; color: #a0aec0; line-height: 1.6;">
                    <strong>Spruce Life Skills</strong><br>
                    Website: <a href="${websiteUrl}" style="color: #764ba2; text-decoration: none;">${websiteUrl.replace('https://', '')}</a><br>
                    Transforming Skills into Success.
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #a0aec0;">
                &copy; ${new Date().getFullYear()} Spruce Life Skills. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

export const getNewUserWelcomeTemplate = (userName, email, password, role, websiteUrl = "https://www.sprucelifeskills.com") => {
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Spruce Life Skills</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7fafc; color: #2d3748;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #13523f 0%, #1a6e4a 100%); text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Welcome to Spruce Life Skills! 🌿</h1>
                <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 16px;">Your account has been created</p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #1a202c;">Hi ${userName},</h2>
                <p style="margin: 0 0 20px 0; line-height: 1.6; color: #4a5568;">An account has been created for you on <strong>Spruce Life Skills</strong> with the role of <strong>${roleLabel}</strong>. Here are your login credentials — please keep them safe.</p>

                <!-- Credentials Box -->
                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.05em;">🔑 Your Login Credentials</h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #dcfce7; color: #4a5568; font-weight: 600; width: 100px;">Email</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #dcfce7; color: #1e293b; font-weight: 700;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #dcfce7; color: #4a5568; font-weight: 600;">Password</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #dcfce7; font-family: monospace; font-size: 16px; font-weight: 700; color: #13523f; letter-spacing: 1px;">${password}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #4a5568; font-weight: 600;">Role</td>
                            <td style="padding: 10px 0; color: #1e293b; font-weight: 700;">${roleLabel}</td>
                        </tr>
                    </table>
                </div>

                <p style="margin: 0 0 10px 0; line-height: 1.6; color: #e53e3e; font-size: 13px; font-weight: 600;">⚠️ For security, please change your password after your first login.</p>

                <!-- Action Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${websiteUrl}/login" style="display: inline-block; padding: 16px 40px; background-color: #13523f; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Login to Your Account →</a>
                </div>

                <p style="margin: 0 0 10px 0; line-height: 1.6; color: #4a5568;">If you have any questions, feel free to reach out to our support team.</p>

                <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;">

                <p style="margin: 0; font-size: 13px; color: #a0aec0; line-height: 1.6;">
                    <strong>Spruce Life Skills</strong><br>
                    Website: <a href="${websiteUrl}" style="color: #13523f; text-decoration: none;">${websiteUrl.replace('https://', '')}</a><br>
                    Transforming Skills into Success.
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center; font-size: 12px; color: #a0aec0;">
                &copy; ${new Date().getFullYear()} Spruce Life Skills. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

export const getLeadEnquiryTemplate = (data, websiteUrl = "https://www.sprucelifeskills.com") => {
    const { name, email, mobile, city, courseName, message } = data;
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Enquiry - Spruce Life Skills</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
        <!-- Header -->
        <tr>
            <td style="padding: 30px; background-color: #0A7A3F; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Student Enquiry! 🎓</h1>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; font-size: 16px; color: #555;">You have received a new enquiry from the landing page. Here are the details:</p>

                <div style="background-color: #f9f9f9; border: 1px solid #eee; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; font-weight: 700; width: 120px;">Full Name:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; font-weight: 700;">Mobile:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef;">${mobile}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; font-weight: 700;">Email:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef;">${email || 'Not Provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; font-weight: 700;">City:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef;">${city || 'Not Provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; font-weight: 700;">Course:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #efefef; color: #0A7A3F; font-weight: 700;">${courseName}</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 15px; color: #333; margin-bottom: 10px; border-left: 4px solid #0A7A3F; padding-left: 10px;">Message / Additional Info:</h3>
                    <div style="background-color: #fff8eb; padding: 15px; border-radius: 4px; font-style: italic; color: #666; font-size: 13.5px; line-height: 1.5;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="tel:${mobile}" style="display: inline-block; padding: 12px 25px; background-color: #0A7A3F; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 700; font-size: 15px;">Call Lead Now</a>
                </div>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px; background-color: #f4f7f6; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Spruce Life Skills Operations. Generated via Landing Page.
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};
