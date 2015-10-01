"use strict";
require('es6-shim');

var signalStrengthsCodec = require('../../index.js').signalStrengths;
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('signalStrengths', function() {

    it('should encode and decode measurement', function() {

        var measurement = 
        {
            date: new Date(Math.floor(new Date().getTime() / 60000) * 60000),
            devices:
            [
                {
                    signal_strength: -79,
                    ID: 42
                },
                {
                    signal_strength: -30,
                    ID: 12
                }
            ]
        };

        return signalStrengthsCodec.encode(measurement)
        .then(function (encoded) {

            return signalStrengthsCodec.decode(encoded)
            .then(function (decoded) {

                expect(JSON.stringify(decoded)).to.be.equal(JSON.stringify(measurement));
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
