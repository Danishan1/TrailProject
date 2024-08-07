--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS verification (
        otpId INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM ('mobile', 'email', 'call') NOT NULL,
        otp VARCHAR(6) NOT NULL,
        verificationID VARCHAR(50) NOT NULL, -- EmailId, MobileNo, ect
        purpose ENUM ('registration', 'passwordReset', 'verification') NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiresAt TIMESTAMP NOT NULL
    );