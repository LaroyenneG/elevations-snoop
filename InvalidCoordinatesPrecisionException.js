const ERROR_MESSAGE = "Invalid coordinates precision";


class InvalidCoordinatesPrecisionException extends Error {

    constructor() {
        super(ERROR_MESSAGE);
    }

}

module.exports = InvalidCoordinatesPrecisionException;