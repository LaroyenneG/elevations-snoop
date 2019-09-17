const Coordinate = require('./Coordinates');
const request = require('sync-request');
const util = require('util');
const HTMLParser = require('node-html-parser');


const URL = "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/alti/rest/elevation.xml?lon=%f&lat=%f";

class Elevation {

    constructor(latitude, longitude, altitude = 0) {
        this.coordinates = new Coordinate(latitude, longitude);
        this.altitude = altitude;
    }


    findElevation() {

        let url = util.format(URL, this.coordinates.longitude, this.coordinates.latitude);

        let res = request('GET', url, {
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'}
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

            this.coordinates.latitude = latitude;
            this.coordinates.longitude = longitude;
            this.altitude = altitude;

        } else {
            throw new Error("Invalid elements");
        }
    }
}

module.exports = Elevation;