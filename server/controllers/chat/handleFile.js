import CustomError from "../../utils/error.js";

export const handleFile = async (messageId, chatId, data, conn) => {
    
    try {
        const { fileName, filePath, fileSize, fileType } = data;
        await conn.query(
            `INSERT INTO file (messageId, chatId,  fileName, filePath, fileSize, fileType)
         VALUES (?, ?, ?, ?, ?, ?)`,
            [messageId, chatId, fileName, filePath, fileSize, fileType]
        );
    } catch (err) {
        throw new CustomError('Error while entering file into the database', '0001F', err);

    }
}