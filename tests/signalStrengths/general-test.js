"use strict";
require('es6-shim');

var signalStrengthsCodec = require('../../index.js').signalStrengths;
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('signalStrengths', function() {

    it('should encode and decode measurement with variance', function() {

        var measurement = 
        {
            date: new Date(Math.floor(new Date().getTime() / 60000) * 60000),
            devices:
            [
                {
                    signal_strength: -79,
                    variance: 42.5
                },
                {
                    signal_strength: -30,
                    variance: 12.2
                }
            ]
        };

        return signalStrengthsCodec.encode(measurement)
        .then(function (encoded) {

            return signalStrengthsCodec.decode(encoded)
            .then(function (decoded) {

                expect(decoded.date.toString()).to.deep.equal(measurement.date.toString());
                measurement.devices.forEach(function (device, index) {
                    expect(decoded.devices[index].signal_strength).to.be.deep.equal(device.signal_strength);
                    if (device.variance)
                        expect(Math.abs(decoded.devices[index].variance - device.variance)).to.be.most(0.001);
                    else
                        expect(decoded.devices[index].variance).to.be.undefined;
                });
            });
        });
    });

    it('should encode and decode measurement without variance', function() {

        var measurement = 
        {
            date: new Date(Math.floor(new Date().getTime() / 60000) * 60000),
            devices:
            [
                {
                    signal_strength: -79
                },
                {
                    signal_strength: -30
                }
            ]
        };

        return signalStrengthsCodec.encode(measurement)
        .then(function (encoded) {

            return signalStrengthsCodec.decode(encoded)
            .then(function (decoded) {

                expect(decoded.date.toString()).to.deep.equal(measurement.date.toString());
                measurement.devices.forEach(function (device, index) {
                    expect(decoded.devices[index].signal_strength).to.be.deep.equal(device.signal_strength);
                    if (device.variance)
                        expect(Math.abs(decoded.devices[index].variance - device.variance)).to.be.most(0.001);
                    else
                        expect(decoded.devices[index].variance).to.be.undefined;
                });
            });
        });
    });

    it('should return an error if trying to encode something wrong', function() {
        var promise = signalStrengthsCodec.encode({date: new Date(), invalid_field: "foo"});

        expect(promise).to.be.rejected;
    });

    it('should return an error if trying to decode something wrong', function() {
        var promise = signalStrengthsCodec.decode(Math.random().toString(36).slice(2, 10))

        expect(promise).to.be.rejected;
    }); 
});
