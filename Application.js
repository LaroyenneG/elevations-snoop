const Snoop = require('./Snoop');

let snoop = new Snoop(45, 48, 7, 8, 2);

snoop.generateElevations();

console.log("Not founds = " + snoop.findElevations());

console.log(snoop.elevations);