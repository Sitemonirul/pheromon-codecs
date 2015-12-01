"use strict";
require('es6-shim');

var decodeProtoDelta = require('./decodeMeasurement-delta-protobuf');
var unshrinkMeasurementInformation = require('./unshrinkMeasurementInformation');

// buffer : buffer to decode
// options : {minDateUnixTimestamp: integer, minSignalStrength: integer in dB}
module.exports = function decode(buffer, options){
    return new Promise(function(resolve, reject){
        resolve(decodeProtoDelta(buffer));
    })
    .then(function(measurement){
        return unshrinkMeasurementInformation(measurement, options);
    });
};
