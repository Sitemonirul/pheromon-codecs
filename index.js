"use strict";

var signalStrengths = require('./signalStrengths/codec.js');
var trajectories = require('./trajectories/codec.js');

module.exports = {
    signalStrengths: signalStrengths,
    trajectories: trajectories
};
