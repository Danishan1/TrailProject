import CustomError from "../../utils/error.js";
import { convertToDate } from "../../utils/WorkingWithDate.js";
import { formatTime2HHMMSS } from "../../utils/WorkingWithTime.js";

export const handleMeeting = async (messageId, chatId, data, conn) => {
    const addressId = 1;

    try {
        let { title, purpose, description, date, time, duration, location, videoCallLink } = data;
        time = formatTime2HHMMSS(time);
        date = convertToDate(date);
        await conn.query(
            `INSERT INTO meeting (messageId, chatId, title, purpose, description, date, time, duration, location, addressId, videoCallLink)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [messageId, chatId, title, purpose, description, date, time, duration, location, addressId, videoCallLink]
        );
    } catch (err) {
        throw new CustomError('Error while entering meeting into the database', '0001C', err);


    }

}
