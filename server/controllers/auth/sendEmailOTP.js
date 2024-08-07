import { sendEmail } from "./sendEmail.js";

/**
 * Function to send an OTP email
 * @param {string} email - The recipient's email address
 * @param {string} userName - Name of the user to whom we are sending the email
 * @param {string} otp - Generated OTP
 * @param {string} purpose - Enum of ['registration', 'passwordReset', 'verification']
 * @returns {Object} - Object containing the result of the email sending operation
 */
export const sendEmailOTP = async (userName, otp, purpose, type, email) => {
    // if (type !== 'email') 
    //     return { isEmailSent: false, message: 'Invalid type' };

    const text = `Congratulations! ${userName}\n OTP is ${otp} for ${type} ${purpose}`;
    const subject = `itsRIGHTtime: OTP for ${purpose}`;

    try {
        const info = await sendEmail(email, subject, text);
        return { isEmailSent: true, email, sendOTP_message: info.response };
    } catch (error) {
        console.error('Error sending email:', error);
        return { isEmailSent: false, sendOTP_message: error.message };
    }
};