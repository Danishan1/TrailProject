--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS chat_list (
        listId INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(10) NOT NULL,
        chatId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user (userId),
        FOREIGN KEY (chatId) REFERENCES chat (chatId)
    );