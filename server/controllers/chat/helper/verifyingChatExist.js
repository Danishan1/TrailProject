export const verifyingChatExist = async (connection, userId, participantId) => {
    // Checking if the chat with that user exists or not
    let query = `
        SELECT DISTINCT userList.chatId
        FROM chat_list userList
        JOIN chat_list partiList ON userList.chatId = partiList.chatId
        WHERE userList.userId = ? AND partiList.userId = ?;
    `;
    let [results] = await connection.query(query, [userId, participantId]);

    query = `
        SELECT DISTINCT chatId 
        FROM chat
        WHERE chatId = ? AND isGroupChat = true;
    `;

    for (const chat of results) {
        const [chatResults] = await connection.query(query, [chat.chatId]);

        if (chatResults.length > 0) {
            return { isChatPresent: true, chatId: chat.chatId };
        }
    }

    return { isChatPresent: false };
};
