"use strict";
require('es6-shim');

var decodeProtoDelta = require('./decodeMeasurement-delta-protobuf');
var unshrinkMeasurementInformation = require('./unshrinkMeasurementInformation');


module.exports = function decode(buffer){
    return new Promise(function(resolve, reject){
	resolve(decodeProtoDelta(buffer));
    })
    .then(function(measurement){
	return unshrinkMeasurementInformation(measurement);
    })
}



