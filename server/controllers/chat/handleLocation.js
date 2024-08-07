import CustomError from "../../utils/error.js";

export const handleLocation = async (messageId, chatId, data, conn) => {
    
    try {
        let { addressId } = data;
        addressId = 1;
        await conn.query(
            `INSERT INTO location (messageId, chatId, addressId)
         VALUES (?, ?, ?)`,
            [messageId, chatId, addressId]
        );
    } catch (err) {
        throw new CustomError('Error while entering location into the database', '0001E', err);
 
    }
}
