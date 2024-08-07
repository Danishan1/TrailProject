--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS payment (
        paymentId INT AUTO_INCREMENT PRIMARY KEY,
        messageId INT NOT NULL,
        chatId INT NOT NULL,
        payFrom VARCHAR(50),
        payTo VARCHAR(50),
        amount DECIMAL(10, 2),
        dueDate DATE,
        payStatus BOOLEAN DEFAULT FALSE,
        refNo VARCHAR(50),
        bankName VARCHAR(50),
        paymentMethod VARCHAR(20), -- e.g., credit card, bank transfer, etc.
        currency VARCHAR(5) DEFAULT 'INR', -- Default to INR, or any currency code
        FOREIGN KEY (chatId) REFERENCES chat (chatId),
        FOREIGN KEY (messageId) REFERENCES message (messageId),
        UNIQUE (messageId)
    );
