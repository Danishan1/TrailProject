--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS file (
        fileId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        fileName VARCHAR(50) NOT NULL,
        filePath VARCHAR(255) NOT NULL, -- Path or URL in cloud storage
        fileSize VARCHAR(20), -- Size in bytes
        fileType VARCHAR(50), -- MIME type (e.g., pdf/doc)
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        UNIQUE (messageId)
    );