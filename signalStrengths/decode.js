"use strict";
require('es6-shim');

var zlib = require('zlib');

var decodeProtoDelta = require('./decodeMeasurement-delta-protobuf');
var unshrinkMeasurementInformation = require('./unshrinkMeasurementInformation');


module.exports = function decode(str){
    var buffer = new Buffer(str, 'base64');

    return (new Promise(function(resolve, reject){
        zlib.inflate(buffer, function(err, unzippedBuffer){
            if(err) reject(err); else resolve(unzippedBuffer);
        });
    }))
    .then(decodeProtoDelta)
    .then(function(measurement){
        return unshrinkMeasurementInformation(measurement);

    });

}



