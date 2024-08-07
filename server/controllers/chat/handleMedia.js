import CustomError from "../../utils/error.js";

export const handleMedia = async (messageId, chatId, data, conn) => {
    try {
        
        const { mediaName, mediaPath, mediaSize, mediaType, duration, bitrate } = data;
        await conn.query(
            `INSERT INTO media (messageId, chatId, mediaName, mediaPath, mediaSize, mediaType, duration, bitrate)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [messageId, chatId, mediaName, mediaPath, mediaSize, mediaType, duration, bitrate]
        );
    } catch (err) {
        throw new CustomError('Error while entering Media into the database', '0001D', err);

    }
}
