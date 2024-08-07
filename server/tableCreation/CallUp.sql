--
-- Do not change the Order of atributes as they are used in query logics
--

CREATE TABLE
    IF NOT EXISTS call_up (
        callId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        callType ENUM ('video', 'audio'),
        duration VARCHAR(20),
        callStatus VARCHAR(50), -- recieve or not connect, ect
        callQuality VARCHAR(50),
        participants TEXT, -- JSON or comma-separated list of participant IDs
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        UNIQUE (messageId)
    );