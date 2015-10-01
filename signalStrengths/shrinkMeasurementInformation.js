"use strict";

var moment = require('moment');

var MIN_DATE_UNIX_TIMESTAMP = require('./MIN_DATE_UNIX_TIMESTAMP');


var MIN_SIGNAL_STRENGTH = require('./MIN_SIGNAL_STRENGTH');
// var MAX_SIGNAL_STRENGTH = MIN_SIGNAL_STRENGTH + 255;

function toByte(v){
    return v - MIN_SIGNAL_STRENGTH;
}

/*
    
*/
module.exports = function shrinkMeasurementInformation(measurement){
    var date = moment(measurement.date);
    var secondTimestamp = date.unix();
    var recentTimestampSec = secondTimestamp - MIN_DATE_UNIX_TIMESTAMP;
    var devices = measurement.devices;

    // shrink date
    var recentTimestampMin = Math.floor(recentTimestampSec/60);

    // sort by signal_strength
    devices.sort(function(a, b) {
        return a.signal_strength < b.signal_strength ? -1 : 1;
    });

    // shrink signal strengths
    var devices = devices.map(function (device) {
        return {
            signal_strength: toByte(device.signal_strength),
            ID: device.ID
        };
    });

    return {
        date: recentTimestampMin,
        devices: devices
    };
};
