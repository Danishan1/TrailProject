export const splitMessageContent = (results) => {
    return results.map(row => {
        if (row.messageType === 'media') {
            const [mediaName, mediaPath, mediaSize, mediaType, duration, bitrate] = row.messageContent.split('|@@|');
            row.messageContent = {
                mediaName, mediaPath, mediaSize, mediaType, duration, bitrate
            };
            return row;

        } else if (row.messageType === 'meeting') {
            const [title, purpose, description, date, time, duration, location, addressId, videoCallLink
            ] = row.messageContent.split('|@@|');
            row.messageContent = {
                title, purpose, description, date, time, duration, location, addressId, videoCallLink
            };
            return row;

        } else if (row.messageType === 'text') {
            row.messageContent = { text: row.messageContent };
            return row;

        } else if (row.messageType === 'payment') {
            const [payFrom, payTo, amount, dueDate, payStatus, refNo, bankName, paymentMethod, currency
            ] = row.messageContent.split('|@@|');
            row.messageContent = {
                payFrom, payTo, amount, dueDate, payStatus, refNo, bankName, paymentMethod, currency
            };
            return row;

        } else if (row.messageType === 'call_up') {
            const [callType, duration, callStatus, callQuality, participants] = row.messageContent.split('|@@|');
            row.messageContent = {
                callType, duration, callStatus, callQuality, participants
            };
            return row;

        } else if (row.messageType === 'location') {
            row.messageContent = {
                addressId: row.messageContent
            };
            return row;

        } else if (row.messageType === 'file') {
            const [fileName, filePath, fileSize, fileType
            ] = row.messageContent.split('|@@|');
            row.messageContent = {
                fileName, filePath, fileSize, fileType
            };
            return row;
        }
    });
}


















