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

module.exports = function shrink (trajectories) {
    return trajectories.map(function (trajectory) {
        return trajectory.map(function (measurement) {
            return {
                date: shrinkDate(measurement.date),
                signal_strength: shrinkSignal(measurement.signal_strength)
            };
        });
    });
};
