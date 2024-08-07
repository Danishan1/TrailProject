import pool from "../../config/db.js";

export const createGroupChat = async (req, res) => {
    const userId = req.session.userId;
    let { participantsId, groupName, groupDescription, members } = req.body;

    if (!userId || !participantsId || !groupName || !groupDescription || !members) {
        return res.status(200).json({ responseId: '00011', error: "Missing required fields" });
    }

    participantsId = Array.from(new Set(participantsId));
    const isGroupChat = true;
    const createdBy = userId;

    let query;
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        query = `SELECT userId FROM user WHERE userId = ?`;
        let isParticipant = [];

        for (let participantId of participantsId) {
            const [checkParticipant] = await connection.query(query, [participantId]);
            if (checkParticipant.length === 0) {
                isParticipant.push(participantId)
            }
        }
        if (isParticipant.length > 0) return res.status(200).json({ responseId: '00019', message: `Some Users do not not exist`, participantsId });

        query = `INSERT INTO chat (members, admin, chatName, chatDescription, isGroupChat, createdBy, updatedBy)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [chatResults] = await connection.query(query, [members, userId, groupName, groupDescription, isGroupChat, createdBy, createdBy]);
        const chatId = chatResults.insertId;

        query = `INSERT INTO chat_list (userId, chatId) VALUES (?, ?)`;

        await connection.query(query, [userId, chatId]); // The one who is creating the group

        // Add participants to the chat_list
        for (const participantId of participantsId) {
            await connection.query(query, [participantId, chatId]);
        }

        await connection.commit();
        res.status(201).json({ chatId, responseId: '0000F' });
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ responseId: '00010', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};
