import CustomError from "../../utils/error.js";
import { convertToDate } from "../../utils/WorkingWithDate.js";

export const handlePayment = async (messageId, chatId, data, conn) => {

    try {
        let { payFrom, payTo, amount, dueDate, payStatus = false, refNo, bankName, paymentMethod, currency = 'INR' } = data;
        dueDate = convertToDate(dueDate);

        await conn.query(
            `INSERT INTO payment (messageId, chatId, payFrom, payTo, amount, dueDate, payStatus, refNo, bankName, paymentMethod, currency )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [messageId, chatId, payFrom, payTo, amount, dueDate, payStatus, refNo, bankName, paymentMethod, currency]
        );
    } catch (err) {
        throw new CustomError('Error while entering payment into the database', '0001B', err);

    }
}
