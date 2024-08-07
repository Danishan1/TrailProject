// API Routes
import pool from "../../config/db.js";

export const verifyOTP = async (req, res) => {
    const { type, otp, verificationId } = req.body;
    if (!['mobile', 'email', 'call'].includes(type)) {
        return res.json({ isValid: false, message: 'Invalid type' });
    }
    try {
        const query = `
            SELECT * 
            FROM verification 
            WHERE type = ? AND verificationId = ? AND otp = ? 
            ORDER BY createdAt DESC 
            LIMIT 1
        `;
        const [rows] = await pool.query(query, [type, verificationId, otp]);

        if (rows.length === 0) {
            return res.json({ isValid: false, message: 'Not Verified!' });
        }

        const otpRecord = rows[0];
        const currentTime = new Date();

        if (new Date(otpRecord.expiresAt) < currentTime) {
            return res.json({ isValid: false, message: 'OTP Expired!' });
        }

        // Delete OTP from database
        const deleteQuery = 'DELETE FROM verification WHERE verificationId = ? AND otp = ?';
        await pool.query(deleteQuery, [verificationId, otp]);

        return res.json({ isValid: true, message: 'Verified!' });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.json({ isValid: false, message: 'Server Error' });
    }
};
