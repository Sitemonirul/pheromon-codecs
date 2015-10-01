"use strict";

var fs = require('fs');
var path = require('path');
var protobuf = require('protocol-buffers');

var deltaEncode = require('./delta-encode');

var message = protobuf(fs.readFileSync(path.join(__dirname, '/delta-encoded-measurement.proto')));

module.exports = function(measurement){

    var IDs = measurement.devices.map(function (device) {
        return device.ID;
    });

    var signal_strengths = measurement.devices.map(function (device) {
        return device.signal_strength;
    });

    return message.AffluenceSensorMeasurement.encode({
        date: measurement.date,
        signal_strengths: deltaEncode(signal_strengths),
        IDs: IDs
    });
};
