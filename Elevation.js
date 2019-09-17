const Coordinate = require('./Coordinates');

class Elevation {

    constructor(coordinates = null, altitude = 0) {
        this.coordinates = coordinates;
        this.altitude = altitude;
    }

    toString() {

    }
}

module.exports = Elevation;