const Constants = require('./Constants');
const Elevation = require('./Elevation');
const SnoopBounds = require('./SnoopBounds');

const request = require('sync-request');
const util = require('util');
const HTMLParser = require('node-html-parser');

const WEB_SITE_ERROR_MESSAGE = "Invalid web page format";

class Snoop {

    constructor(snoopBounds) {
        this.snoopBounds = snoopBounds;
        this.elevations = [];
    }

    static findElevation(elevation = null) {

        if (elevation !== null) {

            let url = util.format(Constants.URL, elevation.longitude, elevation.latitude);

            let res = request('GET', url, {
                headers: {'User-Agent': Constants.USER_AGENT}
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

                elevation.latitude = latitude;
                elevation.longitude = longitude;
                elevation.altitude = altitude;

            } else {
                throw new Error(WEB_SITE_ERROR_MESSAGE);
            }
        }

        return elevation;
    }

    generateElevations() {

        this.elevations = [];

        for (let latitude = this.snoopBounds.minLatitude; latitude <= this.snoopBounds.maxLatitude; latitude += Math.pow(10, -this.snoopBounds.precision)) {
            for (let longitude = this.snoopBounds.minLongitude; longitude <= this.snoopBounds.maxLongitude; longitude += Math.pow(10, -this.snoopBounds.precision)) {
                this.elevations.push(new Elevation(latitude, longitude, this.snoopBounds.precision));
            }
        }

        return this.elevations;
    }

    findElevations() {

        let failedCounter = 0;

        this.elevations.forEach((elevation) => {
            try {
                Snoop.findElevation(elevation);
            } catch (e) {
                failedCounter++;
            }
        });

        if (failedCounter > 0) {

            failedCounter = 0;

            this.elevations.filter((elevation) => !elevation.isCorrect()).forEach((elevation) => {
                try {
                    Snoop.findElevation(elevation);
                } catch (e) {
                    failedCounter++;
                }
            });
        }

        return failedCounter;
    }


    clearFailed() {
        this.elevations = this.elevations.filter((elevation) => elevation.isCorrect());
    }
}

module
    .exports = Snoop;