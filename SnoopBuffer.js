const Constants = require('./Constants');
const Snoop = require('./Snoop');
const SnoopBounds = require('./SnoopBounds');

class SnoopBuffer {

    constructor(minLatitude = 0, maxLatitude = 0, minLongitude = 0, maxLongitude = 0, precision = Constants.DEFAULT_PRECISION, bufferSize = Constants.BUFFER_SIZE, func = null) {
        this.snoopBounds = new SnoopBounds(minLatitude, maxLatitude, minLongitude, maxLongitude, precision);
        this.bufferSize = bufferSize;
        this.func = func;
    }


    findElevationsProcess(snoopBounds) {

        let snoop = new Snoop(snoopBounds);

        snoop.generateElevations();

        let counterFailed = snoop.findElevations();

        snoop.clearFailed();

        let elevations = snoop.elevations;

        for (let i = 0; i < elevations.length; i++) {
            this.elevationProcess(elevations[i]);
        }

        return counterFailed;
    }

    findElevations() {

        let failedCounter = 0;

        let eltCounter = 0;

        let minLatitude = this.snoopBounds.minLatitude;
        let minLongitude = this.snoopBounds.minLongitude;

        for (let maxLatitude = this.snoopBounds.minLatitude; maxLatitude <= this.snoopBounds.maxLatitude; maxLatitude += Math.pow(10, -this.snoopBounds.precision)) {
            for (let maxLongitude = this.snoopBounds.minLongitude; maxLongitude <= this.snoopBounds.maxLongitude; maxLongitude += Math.pow(10, -this.snoopBounds.precision)) {
                eltCounter++;
                if (eltCounter >= this.bufferSize) {
                    failedCounter += this.findElevationsProcess(new SnoopBounds(minLatitude, maxLatitude, minLongitude, maxLatitude, this.snoopBounds.precision));
                    eltCounter = 0;
                }
            }
        }

        if (eltCounter >= 0) {
            failedCounter += this.findElevationsProcess(new SnoopBounds(minLatitude, this.snoopBounds.maxLatitude, minLongitude, this.snoopBounds.maxLongitude, this.snoopBounds.precision));
        }
        return failedCounter;
    }

    elevationProcess(elevation) {
        this.func(elevation);
    }
}

module
    .exports = SnoopBuffer;