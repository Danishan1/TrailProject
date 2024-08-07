--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS media (
        mediaId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        mediaName VARCHAR(50) NOT NULL,
        mediaPath VARCHAR(255) NOT NULL, -- Path or URL in cloud storage
        mediaSize VARCHAR(20), -- Size in bytes
        mediaType VARCHAR(50), -- MIME type (e.g., audio/mpeg)
        duration VARCHAR(10), -- Duration in seconds
        bitrate INT, -- Bitrate in kbps
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        UNIQUE (messageId)
    );
