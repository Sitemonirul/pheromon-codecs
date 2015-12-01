"use strict";

var moment = require('moment');

function fromByte(v, min){
    return v + min;
}

module.exports = function unshrinkMeasurementInformation(measurement, options) {

    var MIN_DATE_UNIX_TIMESTAMP = moment("2015-05-15").unix();
    var MIN_SIGNAL_STRENGTH = -110;

    if (options) {
        MIN_DATE_UNIX_TIMESTAMP = options.minDateUnixTimestamp || MIN_DATE_UNIX_TIMESTAMP;
        MIN_SIGNAL_STRENGTH = options.minSignalStrength || MIN_SIGNAL_STRENGTH;
    }

    // Unshrink date
    var unshrinkedDate = moment.unix(measurement.date*60 + MIN_DATE_UNIX_TIMESTAMP);
    
    // Unshrink signal strengths
    var devices = measurement.devices.map(function (device) {
        device.signal_strength = fromByte(device.signal_strength, MIN_SIGNAL_STRENGTH);
        return device;
    });

    return {
        date: new Date(unshrinkedDate),
        devices: devices
    };
};
