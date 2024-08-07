--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS text (
        textId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        text TEXT NOT NULL,
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        UNIQUE (messageId)
    );