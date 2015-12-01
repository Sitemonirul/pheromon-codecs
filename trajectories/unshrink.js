"use strict";

function unshrinkDate(shrinkedDate, min, precision) {
    return new Date(((shrinkedDate * precision) + min) * 1000);
}


function unshrinkSignal(shrinkedSig, min, precision) {
    return shrinkedSig * precision + min;
}

module.exports = function unshrink (trajectories, options) {

    var MIN_DATE_UNIX_TIMESTAMP = new Date("2015-05-15").getTime() / 1000; // seconds
    var MIN_SIGNAL_STRENGTH = -110; // dB
    var PRECISION_SIGNAL_STRENGTH = 5; // dB
    var PRECISION_DATE = 30; // seconds

    if (options) {
        MIN_DATE_UNIX_TIMESTAMP = options.minDateUnixTimestamp || MIN_DATE_UNIX_TIMESTAMP;
        MIN_SIGNAL_STRENGTH = options.minSignalStrength || MIN_SIGNAL_STRENGTH;
        PRECISION_SIGNAL_STRENGTH = options.precisionSignalStrength || PRECISION_SIGNAL_STRENGTH;
        PRECISION_DATE = options.precisionDate || PRECISION_DATE;
    }

    return trajectories.map(function (trajectory) {
        return trajectory.map(function (measurement) {
            return {
                date: unshrinkDate(measurement.date, MIN_DATE_UNIX_TIMESTAMP, PRECISION_DATE),
                signal_strength: unshrinkSignal(measurement.signal_strength, MIN_SIGNAL_STRENGTH, PRECISION_SIGNAL_STRENGTH)
            };
        });
    });
};
