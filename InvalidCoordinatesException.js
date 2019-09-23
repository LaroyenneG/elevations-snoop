const ERROR_MESSAGE = "Invalid coordinates";

class InvalidCoordinatesException extends Error {

    constructor() {

        super(ERROR_MESSAGE);
    }

}


module.exports = InvalidCoordinatesException;