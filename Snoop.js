const Elevation = require('./Elevation');
const request = require('sync-request');
const util = require('util');
const HTMLParser = require('node-html-parser');

const USER_AGENT = "'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'";
const URL = "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/alti/rest/elevation.xml?lon=%f&lat=%f";

class SnoopBounds {
    constructor(minLatitude = 0, maxLatitude = 0, minLongitude = 0, maxLongitude = 0, precision = -1) {
        this.minLatitude = minLatitude;
        this.maxLatitude = maxLatitude;
        this.minLongitude = minLongitude;
        this.maxLongitude = maxLongitude;
        this.precision = precision;
    }
}

class Snoop {

    constructor(minLatitude = 0, maxLatitude = 0, minLongitude = 0, maxLongitude = 0, precision = -1) {
        this.snoopBounds = new SnoopBounds(minLatitude, maxLatitude, minLongitude, maxLongitude, precision);
        this.elevations = [];
    }

    static findElevation(elevation = null) {

        if (elevation !== null) {

            let url = util.format(URL, elevation.coordinates.longitude, elevation.coordinates.latitude);

            let res = request('GET', url, {
                headers: {'User-Agent': USER_AGENT}
            });

            let body = res.getBody('utf8');

            let root = HTMLParser.parse(body.toString());

            let eltLongitude = root.querySelector("lon");
            let eltLatitude = root.querySelector("lat");
            let eltElevation = root.querySelector("z");

            if (eltLatitude !== null && eltLongitude.length !== null && eltElevation.length !== null) {
                let latitude = parseFloat(eltLatitude.innerHTML);
                let longitude = parseFloat(eltLongitude.innerHTML);
                let altitude = parseFloat(eltElevation.innerHTML);

                elevation.coordinates.latitude = latitude;
                elevation.coordinates.longitude = longitude;
                elevation.altitude = altitude;
            } else {
                throw new Error("Invalid elements");
            }
        }

        return elevation;
    }

    generateElevations() {

        this.elevations = [];

        for (let latitude = this.snoopBounds.minLatitude; latitude <= this.snoopBounds.maxLatitude; latitude += Math.pow(10, -this.snoopBounds.precision)) {
            for (let longitude = this.snoopBounds.minLongitude; longitude <= this.snoopBounds.maxLongitude; longitude += Math.pow(10, -this.snoopBounds.precision)) {
                this.elevations.push(new Elevation(latitude, longitude, -1, this.snoopBounds.precision));
            }
        }

        return this.elevations;
    }

    findElevations() {

        let failed = [];

        for (let i = 0; i < this.elevations.length; i++) {
            try {
                Snoop.findElevation(this.elevations[i]);
            } catch (e) {
                failed.push(i);
            }
        }

        let failedCounter = 0;

        for (let i = 0; i < failed.length; i++) {
            try {
                Snoop.findElevation(this.elevations[failed[i]]);
            } catch (e) {
                failedCounter++;
            }
        }


        return failedCounter;
    }
}

module
    .exports = Snoop;