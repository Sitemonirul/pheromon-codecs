'use strict';
require('es6-shim');

var fs = require('fs');
var path = require('path');
var protobuf = require('protocol-buffers');


var unshrinker = require('./unshrink');
var deltaDecoder = require('./delta-decode');
var message = protobuf(fs.readFileSync(path.join(__dirname, '/delta-encoded-measurement.proto')));


// trajectories : trajectories to encode
// options : {minDateUnixTimestamp: integer, 
//            minSignalStrength: integer in dB,
//            precisionSignalStrength: integer in dB,
//            precisionDate: integer in seconds}

module.exports = function decode(buffer, options) {

    return new Promise(function (resolve, reject) {
        var unprotobuffed = message.trajectories.decode(buffer);

        if (!unprotobuffed) {
            reject(new Error('Error while decoding : not a protobuffer'));
        }

        var trajectories = unprotobuffed.trajectories;

        var deltaDecoded = trajectories.map(function (trajectory) {

            var dates = deltaDecoder(trajectory.dates);
            var signal_strengths = deltaDecoder(trajectory.signal_strengths);

            var rebuiltObj = [];

            for (var i = 0; i < dates.length; i++) {
                rebuiltObj.push({date: dates[i], signal_strength: signal_strengths[i]});
            }

            return rebuiltObj;
        });

        resolve(unshrinker(deltaDecoded, options));
    });
};
