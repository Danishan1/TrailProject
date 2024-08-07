
/**
 *  - SQL query to retrieve all messages for a specific chat. 
 *  - The query dynamically fetches messages based on the provided chatId.
 *  - it has a column messageType, messageContent is Specific to each messageType 
 *  - MessageContent Seperator '|@@|'
 * 
 * 
 * @returns SQL Query
 */

export const getChatQuery = () => `WITH
    text_messages AS (
        SELECT
            messageId,
            'text' AS messageType,
            text AS messageContent
        FROM
            text
        WHERE
            chatId = ?
    ),
    media_messages AS (
        SELECT
            messageId,
            'media' AS messageType,
            CONCAT (
                mediaName,
                '|@@|',
                mediaPath,
                '|@@|',
                mediaSize,
                '|@@|',
                mediaType,
                '|@@|',
                duration,
                '|@@|',
                bitrate
            ) AS messageContent
        FROM
            media
        WHERE
            chatId = ?
    ),
    meeting_messages AS (
        SELECT
            messageId,
            'meeting' AS messageType,
            CONCAT (
                title,
                '|@@|',
                purpose,
                '|@@|',
                description,
                '|@@|',
                date,
                '|@@|',
                time,
                '|@@|',
                duration,
                '|@@|',
                location,
                '|@@|',
                addressId,
                '|@@|',
                videoCallLink
            ) AS messageContent
        FROM
            meeting
        WHERE
            chatId = ?
    ),
    payment_messages AS (
        SELECT
            messageId,
            'payment' AS messageType,
            CONCAT (
                payFrom,
                '|@@|',
                payTo,
                '|@@|',
                amount,
                '|@@|',
                dueDate,
                '|@@|',
                payStatus,
                '|@@|',
                refNo,
                '|@@|',
                bankName,
                '|@@|',
                paymentMethod,
                '|@@|',
                currency
            ) AS messageContent
        FROM
            payment
        WHERE
            chatId = ?
    ),
    call_up_messages AS (
        SELECT
            messageId,
            'call_up' AS messageType,
            CONCAT (
                callType,
                '|@@|',
                duration,
                '|@@|',
                callStatus,
                '|@@|',
                callQuality,
                '|@@|',
                participants
            ) AS messageContent
        FROM
            call_up
        WHERE
            chatId = ?
    ),
    location_messages AS (
        SELECT
            messageId,
            'location' AS messageType,
            addressId AS messageContent
        FROM
            location
        WHERE
            chatId = ?
    ),
    file_messages AS (
        SELECT
            messageId,
            'file' AS messageType,
            CONCAT (
                fileName,
                '|@@|',
                filePath,
                '|@@|',
                fileSize,
                '|@@|',
                fileType
            ) AS messageContent
        FROM
            file
        WHERE
            chatId = ?
    ),
    all_messages AS (
        SELECT
            *
        FROM
            text_messages
        UNION ALL
        SELECT
            *
        FROM
            media_messages
        UNION ALL
        SELECT
            *
        FROM
            meeting_messages
        UNION ALL
        SELECT
            *
        FROM
            payment_messages
        UNION ALL
        SELECT
            *
        FROM
            call_up_messages
        UNION ALL
        SELECT
            *
        FROM
            location_messages
        UNION ALL
        SELECT
            *
        FROM
            file_messages
    )
    -- Main query
SELECT
    m.messageType,
    m.messageContent,
    message.*,
    user.name
FROM
    all_messages m
    JOIN message ON m.messageId = message.messageId
    JOIN user ON message.userId = user.userId
ORDER BY
    m.messageId ASC;`