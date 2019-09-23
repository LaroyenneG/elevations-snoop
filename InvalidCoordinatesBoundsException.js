const ERROR_MESSAGE = "Invalid coordinates bounds";

class InvalidCoordinatesBoundsException extends Error {

    constructor() {
        super(ERROR_MESSAGE);
    }
}


module.exports = InvalidCoordinatesBoundsException;