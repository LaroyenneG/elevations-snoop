const SnoopBuffer = require('./SnoopBuffer');


let snoopBuffer = new SnoopBuffer(40, 50, -5, 8, 1000, console.log);

snoopBuffer.findElevations();