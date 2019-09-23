const ERROR_MESSAGE = "Invalid coordinates key";

class InvalidCoordinatesKeyException extends Error {
    constructor() {
        super(ERROR_MESSAGE);
    }
}

module.exports = InvalidCoordinatesKeyException;