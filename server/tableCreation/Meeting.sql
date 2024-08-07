--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS meeting (
        meetingId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        title VARCHAR(50), -- Simple Short & Sweet Name
        purpose TEXT, -- Why the Meeting is happening
        description TEXT, -- Details of that 
        date DATE,
        time TIME,
        duration VARCHAR(20),
        location VARCHAR(50), -- Online, In Office, Address
        addressId INT,
        videoCallLink VARCHAR(255),
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        FOREIGN KEY (addressId) REFERENCES address (addressId),
        UNIQUE (messageId)
    );