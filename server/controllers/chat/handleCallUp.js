import CustomError from "../../utils/error.js";

export const handleCallUp = async (messageId, chatId, data, conn) => {
    
    try {
        const { callType, duration, callStatus, callQuality, participants } = data;
        await conn.query(
            `INSERT INTO call_up (messageId, chatId, callType, duration, callStatus, callQuality, participants )
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [messageId, chatId, callType, duration, callStatus, callQuality, participants]
        );
    } catch (err) {
        throw new CustomError('Error while entering call_up into the database', '00020', err);

    }
}
