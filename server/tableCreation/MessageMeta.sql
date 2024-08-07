--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS message_meta (
        messageId INT NOT NULL,
        type VARCHAR(20),
        priority VARCHAR(20),
        FOREIGN KEY (messageId) REFERENCES message (messageId)
    );