--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS organization (
        orgId VARCHAR(15) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        mobile VARCHAR(20),
        email VARCHAR(50) NOT NULL UNIQUE,
        website VARCHAR(50),
        size INT,
        password VARCHAR(255),
        addressId INT,
        logoPath VARCHAR(255),
        industry VARCHAR(50),
        createdBy VARCHAR(10), -- user ID
        updatedBy VARCHAR(10), -- user ID
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (addressId) REFERENCES address (addressId)
    );