const ERROR_MESSAGE = "Invalid elevation altitude";

class InvalidElevationAltitudeException extends Error {

    constructor() {
        super(ERROR_MESSAGE);
    }

}

module.exports = InvalidElevationAltitudeException;