import pool from "../../config/db.js";

export const getChatList = async (req, res) => {
    const userId = req.session.userId;

    let conn;

    try {
        conn = await pool.getConnection();
        conn.beginTransaction()

        // Query-1: Selecting all the chatIds based on userId
        const chatListQuery = `SELECT chatId FROM chat_list WHERE userId = ?;`;
        const [chatListResults] = await conn.query(chatListQuery, [userId]);
        const chatIds = chatListResults.map(result => result.chatId);

        if (chatIds.length === 0) {
            return res.status(200).json({ responseCode: '00015', data: [] });
        }

        // Query-2: Finding the details of last message of each chat
        const chatDetailsQuery = `
            SELECT c.chatId, c.chatName, m.messageId,  COALESCE(m.createdAt, c.createdAt) AS lastMsgTime, mm.type
            FROM chat c
            LEFT JOIN (
                SELECT chatId, messageId, createdAt
                FROM message
                WHERE (chatId, messageId) IN (
                    SELECT chatId, MAX(messageId)
                    FROM message
                    GROUP BY chatId
                )
            ) m ON c.chatId = m.chatId
            LEFT JOIN message_meta mm ON m.messageId = mm.messageId
            WHERE c.chatId IN (?)
            ORDER BY lastMsgTime DESC;
            ;
        `;

        const [chatDetailsResults] = await conn.query(chatDetailsQuery, [chatIds]);


        // Fetching actual message text if type is 'text'
        for (let chat of chatDetailsResults) {
            if (chat.type === 'text') {
                const textQuery = `SELECT text FROM text WHERE messageId = ?`;
                const [textResults] = await conn.query(textQuery, [chat.messageId]);
                if (textResults.length > 0) {
                    chat.message = textResults[0].text;
                } else {
                    chat.message = '';
                }
            } else {
                chat.message = "";
            }

            if (chat.messageId !== null) {
                const query = `SELECT status FROM message WHERE messageId = ?`
                const [results] = await conn.query(query, [chat.messageId]);
                chat.status = results[0].status;
            }

        }

        conn.commit();
        res.status(200).json({ responseCode: '00016', data: chatDetailsResults });
    } catch (error) {
        return res.status(500).json({ responseCode: '00017', error });
    } finally {
        if (conn) conn.release();
    }
};
