--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS address (
        addressId INT AUTO_INCREMENT PRIMARY KEY,
        latitude DECIMAL(9, 6),
        longitude DECIMAL(9, 6),
        houseNo VARCHAR(50),
        streetNo VARCHAR(20),
        block VARCHAR(20),
        city VARCHAR(20),
        district VARCHAR(20),
        state VARCHAR(20),
        country VARCHAR(20),
        pincode VARCHAR(10),
        createdBy VARCHAR(10),
        updatedBy VARCHAR(10),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );