"use strict";

var MIN_DATE_UNIX_TIMESTAMP = require('./MIN_DATE_UNIX_TIMESTAMP');
var MIN_SIGNAL_STRENGTH = require('./MIN_SIGNAL_STRENGTH');
var PRECISION_SIGNAL_STRENGTH = require('./PRECISION_SIGNAL_STRENGTH');
var PRECISION_DATE = require('./PRECISION_DATE');

function shrinkDate(date) {
    return Math.floor(Math.max(date.getTime() / 1000 - MIN_DATE_UNIX_TIMESTAMP, 0) / PRECISION_DATE);
}

function shrinkSignal(sig) {
    return Math.round(Math.max(sig - MIN_SIGNAL_STRENGTH, 0) / PRECISION_SIGNAL_STRENGTH);
}

// Shrink measurements (and deleted useless points)
module.exports = function shrink (trajectories) {
    return trajectories.map(function (trajectory) {

        var filtered = [];

        // Deleted measurements with a date delta or signal delta too low.
        trajectory.forEach(function (measurement) {
            if (!filtered.slice(-1)[0])
                filtered.push(measurement);
            else {
                if (((measurement.date.getTime() - filtered.slice(-1)[0].date.getTime()) / 1000 >= PRECISION_DATE) &&
                    (Math.abs(measurement.signal_strength - filtered.slice(-1)[0].signal_strength) >= PRECISION_SIGNAL_STRENGTH))
                    filtered.push(measurement);
            }
        });

        // shrink
        return trajectory
        .map(function (measurement) {
            return {
                date: shrinkDate(measurement.date),
                signal_strength: shrinkSignal(measurement.signal_strength)
            };
        });
    });
};
