const query = `SELECT 
    c.*,
    cp.userId,
    u.name
FROM 
    chat AS c
JOIN 
    chat_list AS cp ON c.chatId = cp.chatId
JOIN 
    user AS u ON cp.userId = u.userId
WHERE 
    c.chatId = ?;`

export const getChatDetails = async (chatId, db) => {
    
    const [result] = await db.query(query, [chatId]);
    return result;
}