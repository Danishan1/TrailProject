import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Function to send an email
 * @param {string} email - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The text content of the email
 * @returns {Promise} - A promise that resolves to the result of the email sending operation
 */
export const sendEmail = (email, subject, content, contentType = 'text') => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        ...(contentType === 'text' ? { text: content } : { html: content })
    };

    return transporter.sendMail(mailOptions);
};
