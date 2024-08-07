import pool from "../../config/db.js";
import { verifyingChatExist } from "./helper/verifyingChatExist.js";

export const createChat = async (req, res) => {
    const userId = req.session.userId;
    const participantId = req.body.participantId;

    if (!userId || !participantId) {
        return res.status(200).json({ responseCode: '00012', message: "Missing required fields" });
    }

    const members = 2; // Since it's a one-on-one chat
    const isGroupChat = false;
    const createdBy = userId;

    let query;
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        //  Checking User Id is valid or not
        query = `SELECT userId, name FROM user WHERE userId = ?`
        const [checkParticipant] = await connection.query(query, [participantId]);

        if (checkParticipant.length === 0) return res.status(200).json({ responseId: '00018', message: `User Id do not exist`, userId: participantId });
        const chatName = checkParticipant[0].name;
        const description = "This is private chat but still leagally bounded."

        const isChatExist = await verifyingChatExist(connection, userId, participantId)

        if (isChatExist.isChatPresent) {
            return res.status(200).json({ chatId: isChatExist.chatId, responseId: '00024' });
        }

        query = `INSERT INTO chat (members, admin, chatName, chatDescription, isGroupChat, createdBy, updatedBy)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

        [results] = await connection.query(query, [members, userId, chatName, description, isGroupChat, createdBy, createdBy]);
        const chatId = results.insertId;

        query = `INSERT INTO chat_list (userId, chatId) VALUES (?, ?)`;

        // Add the current user to chat_list
        await connection.query(query, [userId, chatId]);

        // Add the participant to chat_list
        await connection.query(query, [participantId, chatId]);

        await connection.commit();
        res.status(201).json({ chatId, responseId: '00013' });
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ responseId: '00014', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};
