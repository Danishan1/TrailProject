--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS chat_participant (
        participantId INT AUTO_INCREMENT PRIMARY KEY,
        chatId INT NOT NULL,
        userId VARCHAR(10) NOT NULL,
        status VARCHAR(20), -- Actice or InActive or last seen
        addedBy VARCHAR(10),
        addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (userId) REFERENCES user (userId)
    );