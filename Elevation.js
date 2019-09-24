const Coordinates = require('./Coordinates');
const InvalidElevationAltitudeException = require('./InvalidElevationAltitudeException');

const KEY_SPLIT_CHAR = '/';
const ALTITUDE_BOUNDS = [-500, 9000];

class Elevation extends Coordinates {

    constructor(latitude, longitude, precision = -Infinity, altitude = -Infinity, flag = false) {
        super(latitude, longitude, precision);
        this._altitude = altitude;
        this.flag = flag;
    }

    get altitude() {
        return this._altitude;
    }

    set altitude(altitude) {
        if (altitude <= ALTITUDE_BOUNDS[1] && altitude >= ALTITUDE_BOUNDS[0]) {
            this._altitude = altitude;
            this.flag = true;
        } else {
            throw new InvalidElevationAltitudeException();
        }
    }

    toString() {
        return super.toString() + KEY_SPLIT_CHAR + this.altitude;
    }

    isCorrect() {
        return this.flag;
    }
}

module.exports = Elevation;