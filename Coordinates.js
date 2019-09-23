const InvalidCoordinateKeyException = require('./InvalidCoordinatesKeyException');
const InvalidCoordinatesPrecisionException = require('./InvalidCoordinatesPrecisionException');
const InvalidCoordinatesBoundsException = require('./InvalidCoordinatesBoundsException');

const DEFAULT_PRECISION = 5;
const KEY_SPLIT_CHAR = '/';
const KEY_BASE = 10;
const LATITUDE_BOUNDS = [-90.0, 90.0];
const LONGITUDE_BOUNDS = [-180.0, 180.0];

class Coordinates {

    constructor(latitude = 0, longitude = 0, precision = -Infinity) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.precision = (precision <= 0) ? DEFAULT_PRECISION : precision;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(latitude) {
        if (latitude <= LATITUDE_BOUNDS[1] && latitude >= LATITUDE_BOUNDS[0]) {
            this._latitude = latitude;
        } else {
            throw new InvalidCoordinatesBoundsException();
        }
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(longitude) {
        if (longitude <= LONGITUDE_BOUNDS[1] && longitude >= LONGITUDE_BOUNDS[0]) {
            this._longitude = longitude;
        } else {
            throw new InvalidCoordinatesBoundsException();
        }
    }

    get precision() {
        return this._precision;
    }

    set precision(precision) {
        if (precision > 0) {
            this._precision = precision;
        } else {
            throw new InvalidCoordinatesPrecisionException();
        }
    }

    readKey(string = "") {
        let numbers = string.split(KEY_SPLIT_CHAR);

        if (numbers.length !== 3) {
            throw new InvalidCoordinateKeyException();
        }

        let precision = parseInt(numbers[2]);
        let latitude = parseInt(numbers[0]) / Math.pow(KEY_BASE, precision);
        let longitude = parseInt(numbers[1]) / Math.pow(KEY_BASE, precision);

        this.latitude = latitude;
        this.longitude = longitude;
        this.precision = precision;
    }

    decimalToKey(number) {

        let convertNumber = Math.round(number * Math.pow(KEY_BASE, this.precision));

        return convertNumber.toString();
    }

    key() {
        return this.decimalToKey(this.latitude) + KEY_SPLIT_CHAR + this.decimalToKey(this.longitude) + KEY_SPLIT_CHAR + this.precision;
    }

    toString() {
        return this.key();
    }
}

module.exports = Coordinates;
