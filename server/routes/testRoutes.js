import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/testDB', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS solution');
        res.status(200).json({ message: 'Database connection successful', solution: rows[0].solution });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

router.get('/testDB_DB', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT DATABASE()');
        res.status(200).json({ message: 'Database connected', database: rows[0]['DATABASE()'] });
    } catch (error) {
        console.error('Database connection test failed: ', error);
        res.status(500).json({ message: 'Database connection test failed', error });
    }
});

export default router;
