'use strict';
require('es6-shim');

var fs = require('fs');
var path = require('path');
var protobuf = require('protocol-buffers');


var shrinker = require('./shrink');
var deltaEncoder = require('./delta-encode');
var message = protobuf(fs.readFileSync(path.join(__dirname, '/delta-encoded-measurement.proto')));


function isCorrectFormat(trajectories) {
    if (!trajectories || trajectories.constructor !== Array)
        return false;

    trajectories.forEach(function (trajectory) {
        if (!trajectory || trajectory.constructor !== Array)
            return false;

        trajectory.forEach(function (measurement) {
            if (Object.keys(measurement).sort() !== [ 'date', 'signal_strength' ])
                return false;
            if (measurement.date.constructor !== Date)
                return false;
            if (typeof measurement.signal_strength !== 'number')
                return false;
        });
    });
    return true;
}


module.exports = function encode(trajectories) {
    return new Promise(function (resolve, reject) {
        if (!isCorrectFormat(trajectories))
            reject(new Error('Encoding error, format not correct'));
        else {
            var shrinked = shrinker(trajectories);

            var deltaEncoded = shrinked.map(function (trajectory) { // [{date, signal_strength}, ...]

                var dates = trajectory.map(function (measurement) {
                    return measurement.date;
                });

                var signal_strengths = trajectory.map(function (measurement) {
                    return measurement.signal_strength;
                });

                return { // [{dates, signal_strength}]
                    dates: deltaEncoder(dates),
                    signal_strengths: deltaEncoder(signal_strengths)
                };
            });

            var protobuffed = message.trajectories.encode({trajectories: deltaEncoded});

            if (protobuffed)
                resolve(protobuffed);
            else
                reject(new Error('Encoding error, unknown'));
        }
    });
};
