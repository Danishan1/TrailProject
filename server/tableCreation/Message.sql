--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS message (
        messageId INT AUTO_INCREMENT PRIMARY KEY,
        chatId INT NOT NULL,
        userId VARCHAR(10),
        status VARCHAR(50), -- isDelivered, isRead, isNotRead
        forwardedChat BOOLEAN DEFAULT FALSE,
        createdBy VARCHAR(10),
        updatedBy VARCHAR(10),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (userId) REFERENCES user (userId)
    );