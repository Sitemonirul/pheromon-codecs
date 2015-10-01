"use strict";

var fs = require('fs');
var path = require('path');

var protobuf = require('protocol-buffers');

var deltaDecode = require('./delta-decode');

var message = protobuf(fs.readFileSync(path.join(__dirname, '/delta-encoded-measurement.proto')));

module.exports = function(buffer){
    var measurement = message.AffluenceSensorMeasurement.decode(buffer);
    var signal_strengths;
    
    signal_strengths = deltaDecode(measurement.signal_strengths);

    var devices = signal_strengths.map(function (signal_strength, index) {
        return {
            signal_strength: signal_strength,
            ID: measurement.IDs[index]
        };
    });

    return {
        date: measurement.date,
        devices: devices
    };
};
