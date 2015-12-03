"use strict";

function shrinkDate(date, min, precision) {
    return Math.floor(Math.max(date.getTime() / 1000 - min, 0) / precision);
}

function shrinkSignal(sig, min, precision) {
    return Math.round(Math.max(sig - min, 0) / precision);
}

// Shrink measurements (and deleted useless measurements)
module.exports = function shrink (trajectories, options) {

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

        var filtered = [];

        // Deleted measurements with a date delta or signal delta too low.
        trajectory.forEach(function (measurement) {
            if (!filtered.slice(-1)[0])
                filtered.push(measurement);
            else {
                if (((measurement.date.getTime() - filtered.slice(-1)[0].date.getTime()) / 1000 >= PRECISION_DATE) &&
                    (Math.abs(measurement.signal_strength - filtered.slice(-1)[0].signal_strength) >= PRECISION_SIGNAL_STRENGTH)) {

                    filtered.push(measurement);
                }
            }
        });

        // shrink
        return filtered
        .map(function (measurement) {
            return {
                date: shrinkDate(measurement.date, MIN_DATE_UNIX_TIMESTAMP, PRECISION_DATE),
                signal_strength: shrinkSignal(measurement.signal_strength, MIN_SIGNAL_STRENGTH, PRECISION_SIGNAL_STRENGTH)
            };
        });
    });
};
