/**
 * Premium Email Templates for Spruce Life Skills
 */

export const getEnrollmentTemplate = (userName, courseTitle, installments, totalPayable, websiteUrl = "https://sprucelifeskills.com") => {
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
