--
-- Do not change the Order of atributes as they are used in query logics
--
CREATE TABLE
    IF NOT EXISTS user (
        userId VARCHAR(10) PRIMARY KEY,
        password VARCHAR(225),
        name VARCHAR(50) NOT NULL,
        mobile VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        profilePicPath VARCHAR(255),
        status VARCHAR(50), -- Active, InActive, last Seen
        designation VARCHAR(50),
        orgId VARCHAR(15) NOT NULL,
        lastLogin TIMESTAMP,
        addressId INT,
        createdBy VARCHAR(10),
        updatedBy VARCHAR(10),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (orgId) REFERENCES organization (orgId),
        FOREIGN KEY (addressId) REFERENCES address (addressId)
    );
