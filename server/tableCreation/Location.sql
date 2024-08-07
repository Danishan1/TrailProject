--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS location (
        locationId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        addressId INT NOT NULL,
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (addressId) REFERENCES address (addressId),
        UNIQUE (messageId)
    );