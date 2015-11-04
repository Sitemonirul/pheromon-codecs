"use strict";
require('es6-shim');

var trajectoriesCodec = require('../../index.js').trajectories;
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('trajectories', function() {

    it('should encode and decode measurement', function() {

        var trajectories = 
        [
            [
                {
                    date: new Date(Math.floor(new Date().getTime() / 60000) * 60000),
                    signal_strength: -70
                },

                {
                    date: new Date(Math.floor(new Date().getTime() / 60000) * 60000 + 30000),
                    signal_strength: -65
                }
            ],
            [
                {
                    date: new Date(Math.floor(new Date().getTime() / 60000) * 60000),
                    signal_strength: -40
                }
            ]
        ];

        return trajectoriesCodec.encode(trajectories)
        .then(function (encoded) {

            return trajectoriesCodec.decode(encoded)
            .then(function (decoded) {

                expect(JSON.stringify(decoded)).to.be.equal(JSON.stringify(trajectories));
            });
        });
    });

    it('should return an error if trying to encode something wrong', function() {
        var promise1 = trajectoriesCodec.encode(1);
        var promise2 = trajectoriesCodec.encode([1, 2, 3]);
        var promise3 = trajectoriesCodec.encode({foo: 1, bar: 2});
        var promise4 = trajectoriesCodec.encode([ [{foo: 1, bar: 2}], [{foo: 1, bar: 2}] ]);
        var promise5 = trajectoriesCodec.encode([ [{date: new Date(), signal_strength: -25}], [{date: 1, signal_strength: -2}] ]);


        expect(promise1).to.be.rejected;
        expect(promise2).to.be.rejected;
        expect(promise3).to.be.rejected;
        expect(promise4).to.be.rejected;
        expect(promise5).to.be.rejected;
    });

    it('should return an error if trying to decode something wrong', function() {
        var promise = trajectoriesCodec.decode(Math.random().toString(36).slice(2, 10));

        expect(promise).to.be.rejected;
    }); 
});
