class CustomError extends Error {
    constructor(message, responseCode, err) {
        super(message);
        this.responseCode = responseCode;
        this.error = err;
    }
}

export default CustomError;
