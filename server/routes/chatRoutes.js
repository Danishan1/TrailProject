import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getChats } from '../controllers/chat/getChat.js';
import { createChat } from '../controllers/chat/createChat.js';
import { createGroupChat } from '../controllers/chat/createGroupChat.js';
import { getChatList } from '../controllers/chat/getChatList.js';
import addMessage from '../controllers/chat/messageController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/getChat', getChats); // http://localhost:5000/api/chats/getChat
router.post('/addMsg', addMessage); // http://localhost:5000/api/chats/addMsg
router.post('/createChat', createChat); // http://localhost:5000/api/chats/createChat
router.post('/createGroupChat', createGroupChat); // http://localhost:5000/api/chats/createGroupChat
router.get('/getChatList', getChatList); // http://localhost:5000/api/chats/getChatList

export default router;
