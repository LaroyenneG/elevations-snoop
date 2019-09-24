const Constants = require('./Constants');

const InvalidCoordinateKeyException = require('./InvalidCoordinatesKeyException');
const InvalidCoordinatesPrecisionException = require('./InvalidCoordinatesPrecisionException');
const InvalidCoordinatesBoundsException = require('./InvalidCoordinatesBoundsException');

class Coordinates {

    constructor(latitude = 0, longitude = 0, precision = Constants.UNKNOWN_VALUE) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.precision = (precision <= 0) ? Constants.DEFAULT_PRECISION : precision;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(latitude) {
        if (latitude <= Constants.LATITUDE_BOUNDS[1] && latitude >= Constants.LATITUDE_BOUNDS[0]) {
            this._latitude = latitude;
        } else {
            throw new InvalidCoordinatesBoundsException();
        }
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(longitude) {
        if (longitude <= Constants.LONGITUDE_BOUNDS[1] && longitude >= Constants.LONGITUDE_BOUNDS[0]) {
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
        let numbers = string.split(Constants.KEY_SPLIT_CHAR);

        if (numbers.length !== 3) {
            throw new InvalidCoordinateKeyException();
        }

        let precision = parseInt(numbers[2]);
        let latitude = parseInt(numbers[0]) / Math.pow(Constants.KEY_BASE, precision);
        let longitude = parseInt(numbers[1]) / Math.pow(Constants.KEY_BASE, precision);

        this.latitude = latitude;
        this.longitude = longitude;
        this.precision = precision;
    }

    decimalToKey(number) {

        let convertNumber = Math.round(number * Math.pow(Constants.KEY_BASE, this.precision));

        return convertNumber.toString();
    }

    key() {
        return this.decimalToKey(this.latitude) + Constants.KEY_SPLIT_CHAR + this.decimalToKey(this.longitude) + Constants.KEY_SPLIT_CHAR + this.precision;
    }

    toString() {
        return this.key();
    }
}

module.exports = Coordinates;
