import bcrypt from 'bcryptjs';
import pool from '../../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import generateUserId from './generateID.js';
import generatePasscode from './generatePasscode.js';
import { generateHashPassword } from './generate.js';


// Register new user
export const registerUser = async (req, res) => {
    const { name, mobile, email, profilePic, status, designation, orgId, createdBy } = req.body;
    const userId = generateUserId();
    const password = generatePasscode();
    const hashedPassword = await generateHashPassword(password);

    try {
        const [rows] = await pool.query(
            'INSERT INTO User (userId, name, mobile, email, profilePicPath, status, designation, orgId, createdBy, updatedBy, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, name, mobile, email, profilePic, status, designation, orgId, orgId, orgId, hashedPassword]
        );
        // await sendEmail(email, 'Welcome to Chat App', `Your login details:\nUser ID: ${userId}\nPassword: ${password}`);

        res.status(201).json({ code: 'SUCC', message: 'User registered successfully', userId, password });
    } catch (error) {
        res.status(500).json({
            code: "ERROR", message: 'Error registering user', error
        });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { userID, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE userId = ?', [userID]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(201).json({ code: 'INVALID', message: 'Invalid credentials' });
        }

        req.session.userId = user.userId;
        req.session.isLoggedIn = true;

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = uuidv4();
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        await pool.query('UPDATE User SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?', [resetToken, resetTokenExpiry, email]);

        await sendEmail(email, 'Password Reset', `Your password reset token: ${resetToken}`);

        res.status(200).json({ message: 'Password reset token sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset token', error });
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE resetToken = ? AND resetTokenExpiry > ?', [resetToken, Date.now()]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query('UPDATE User SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE userId = ?', [hashedPassword, user.userId]);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};


export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Server error');
        res.send('Logged out');
    });
};

export const profile = (req, res) => {
    if (!req.session.userId) return res.status(401).send('Unauthorized');
    res.send(`User ID: ${req.session.userId}`);
};

// Middleware to protect routes
export const isAuthenticated = (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ isAuth: true, userId: req.session.userId });
    } else
        res.status(401).json({ code: 'UNAUTH', message: 'You are not authenticated' });
};