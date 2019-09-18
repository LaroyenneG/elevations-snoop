const Coordinate = require('./Coordinates');

const TO_STRING_SEP = ';';

class Elevation {

    constructor(latitude, longitude, altitude = -Infinity, precision = -Infinity) {
        this.coordinates = new Coordinate(latitude, longitude, precision);
        this.altitude = altitude;
    }

    key() {
        return this.coordinates.key();
    }

    toString() {
        return this.coordinates.latitude + TO_STRING_SEP + this.coordinates.longitude + TO_STRING_SEP + this.altitude;
    }
}

module.exports = Elevation;