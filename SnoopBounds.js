class SnoopBounds {
    constructor(minLatitude = 0, maxLatitude = 0, minLongitude = 0, maxLongitude = 0, precision = -1) {
        this.minLatitude = minLatitude;
        this.maxLatitude = maxLatitude;
        this.minLongitude = minLongitude;
        this.maxLongitude = maxLongitude;
        this.precision = precision;
    }
}

module.exports = SnoopBounds;