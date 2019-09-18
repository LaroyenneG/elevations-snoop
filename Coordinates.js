const DEFAULT_PRECISION = 5;
const KEY_SPLIT_CHAR = '/';
const KEY_BASE = 10;


class Coordinates {

    constructor(latitude = 0, longitude = 0, precision = -1) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.precision = (precision <= 0) ? DEFAULT_PRECISION : precision;
    }

    readKey(string = "") {
        let numbers = string.split(KEY_SPLIT_CHAR);

        if (numbers.length !== 2) {
            throw new Error("Invalid key");
        }

        let latitude = parseInt(numbers[0]) / Math.pow(KEY_BASE, this.precision);
        let longitude = parseInt(numbers[1]) / Math.pow(KEY_BASE, this.precision);

        this.latitude = latitude;
        this.longitude = longitude;
    }

    decimalToKey(number) {

        let convertNumber = Math.round(number * Math.pow(KEY_BASE, this.precision));

        return convertNumber.toString();
    }

    key() {
        return this.decimalToKey(this.latitude) + KEY_SPLIT_CHAR + this.decimalToKey(this.longitude);
    }

    toString() {
        return this.key();
    }
}

module.exports = Coordinates;