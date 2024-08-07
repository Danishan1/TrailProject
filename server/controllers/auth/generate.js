import bcrypt from 'bcrypt';
import moment from 'moment';

// Hash the password before saving to the database
export const generateHashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Generate a password expiration timestamp
export const generateExpirationDate = () => {
    return moment().add(1, 'hour').toDate(); // Set expiration to 1 hour from now
};