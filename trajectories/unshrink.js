"use strict";

var MIN_DATE_UNIX_TIMESTAMP = require('./MIN_DATE_UNIX_TIMESTAMP');
var MIN_SIGNAL_STRENGTH = require('./MIN_SIGNAL_STRENGTH');
var PRECISION_SIGNAL_STRENGTH = require('./PRECISION_SIGNAL_STRENGTH');
var PRECISION_DATE = require('./PRECISION_DATE');


function unshrinkDate(shrinkedDate) {
    return new Date(((shrinkedDate * PRECISION_DATE) + MIN_DATE_UNIX_TIMESTAMP) * 1000);
}


function unshrinkSignal(shrinkedSig) {
    return shrinkedSig * PRECISION_SIGNAL_STRENGTH + MIN_SIGNAL_STRENGTH;
}

module.exports = function unshrink (trajectories) {
    return trajectories.map(function (trajectory) {
        return trajectory.map(function (measurement) {
            return {
                date: unshrinkDate(measurement.date),
                signal_strength: unshrinkSignal(measurement.signal_strength)
            };
        });
    });
};
