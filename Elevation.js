const Coordinates = require('./Coordinates');


class Elevation extends Coordinates {

    constructor(latitude, longitude, altitude = -Infinity, precision = -Infinity) {
        super(latitude, longitude, precision);
        this.altitude = altitude;
    }


    toString() {
        return super.toString() + Coordinates.KEY_SPLIT_CHAR + this.altitude;
    }
}

module.exports = Elevation;