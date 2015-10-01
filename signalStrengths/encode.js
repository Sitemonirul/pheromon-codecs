"use strict";
require('es6-shim');

var encodeProtoDelta = require('./encodeMeasurement-delta-protobuf');
var shrinkMeasurementInformation = require('./shrinkMeasurementInformation');

var zlib = require('zlib');

module.exports = function encode(measurement){

    return new Promise(function(resolve, reject){

    	if (measurement.date === undefined || measurement.devices === undefined)
    		reject("Cannot encode this object : wrong format");

	    var shrinkedMessage = shrinkMeasurementInformation(measurement);
	    var delta_protobuf_based_buffer = encodeProtoDelta(shrinkedMessage);

        zlib.deflate(delta_protobuf_based_buffer, function(err, buffer){
        	console.log(buffer);
            if(err) reject(err); else resolve(buffer.toString('base64'));
        });
    });
};
