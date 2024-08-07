import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { verifyUser } from '../controllers/user/verfifyUser.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/verifyUser', verifyUser); // http://localhost:5000/api/users/verifyUser



export default router;
