"use strict";

var moment = require('moment');

function toByte(v, min){
    return v - min;
}

module.exports = function shrinkMeasurementInformation(measurement, options) {


    var MIN_DATE_UNIX_TIMESTAMP = moment("2015-05-15").unix();
    var MIN_SIGNAL_STRENGTH = -110;

    if (options) {
        MIN_DATE_UNIX_TIMESTAMP = options.minDateUnixTimestamp || MIN_DATE_UNIX_TIMESTAMP;
        MIN_SIGNAL_STRENGTH = options.minSignalStrength || MIN_SIGNAL_STRENGTH;
    }

    
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
    var newDevices = devices.map(function (device) {
        return {
            signal_strength: toByte(device.signal_strength, MIN_SIGNAL_STRENGTH),
            std: Math.round(device.std)
        };
    });

    return {
        date: recentTimestampMin,
        devices: newDevices
    };
};
