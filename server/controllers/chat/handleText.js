export const handleText = async (messageId, chatId, data, conn, res) => {
    
    try {
        await conn.query(
            `INSERT INTO text (messageId, chatId, text) VALUES (?, ?, ?)`,
            [messageId, chatId, data.text]
        );
    } catch (err) {
        res.status(500).json({ responseCode: "0001A", message: "Error While entring text into database", err })

    }
}
