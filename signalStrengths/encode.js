"use strict";
require('es6-shim');

var encodeProtoDelta = require('./encodeMeasurement-delta-protobuf');
var shrinkMeasurementInformation = require('./shrinkMeasurementInformation');

module.exports = function encode(measurement){

    return new Promise(function(resolve, reject){

    	if (measurement.date === undefined || measurement.devices === undefined)
    		reject("Cannot encode this object : wrong format");

	    var shrinkedMessage = shrinkMeasurementInformation(measurement);
	    var delta_protobuf_based_buffer = encodeProtoDelta(shrinkedMessage);

	if (delta_protobuf_based_buffer)
            resolve(delta_protobuf_based_buffer);
	else
	    reject("Error in encoding : unknown");
    });
};
