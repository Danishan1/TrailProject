--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS chat (
        chatId INT AUTO_INCREMENT PRIMARY KEY,
        members VARCHAR(10), -- Number of Members in that chat
        admin VARCHAR(50),
        chatName VARCHAR(20),
        chatDescription VARCHAR(50),
        isGroupChat BOOLEAN DEFAULT FALSE,
        createdBy VARCHAR(10), -- UserId
        updatedBy VARCHAR(10), -- UserId
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );