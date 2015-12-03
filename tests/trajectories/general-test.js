"use strict";
require('es6-shim');

var trajectoriesCodec = require('../../index.js').trajectories;
var shrinker = require('../../trajectories/shrink.js');
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

                expect(JSON.stringify(shrinker(decoded))).to.be.equal(JSON.stringify(shrinker(trajectories)));
            });
        })
        .catch(function (err) {
            console.log(err);
            throw err;
        });
    });

it('should encode and decode measurement (harder)', function() {

    var trajectories =
[ [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -29 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -61 },
    { date: new Date('Thu Nov 19 2015 16:57:10 GMT+0000 (UTC)'),
      signal_strength: -56 },
    { date: new Date('Thu Nov 19 2015 16:58:19 GMT+0000 (UTC)'),
      signal_strength: -36 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -33 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -29 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -29 },
    { date: new Date('Thu Nov 19 2015 16:57:55 GMT+0000 (UTC)'),
      signal_strength: -24 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -36 },
    { date: new Date('Thu Nov 19 2015 16:57:18 GMT+0000 (UTC)'),
      signal_strength: -31 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -64 },
    { date: new Date('Thu Nov 19 2015 16:57:17 GMT+0000 (UTC)'),
      signal_strength: -59 },
    { date: new Date('Thu Nov 19 2015 16:58:02 GMT+0000 (UTC)'),
      signal_strength: -38 },
    { date: new Date('Thu Nov 19 2015 16:59:03 GMT+0000 (UTC)'),
      signal_strength: -33 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -59 },
    { date: new Date('Thu Nov 19 2015 16:57:10 GMT+0000 (UTC)'),
      signal_strength: -30 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -65 },
    { date: new Date('Thu Nov 19 2015 16:58:48 GMT+0000 (UTC)'),
      signal_strength: -60 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -52 },
    { date: new Date('Thu Nov 19 2015 16:57:13 GMT+0000 (UTC)'),
      signal_strength: -47 },
    { date: new Date('Thu Nov 19 2015 16:57:46 GMT+0000 (UTC)'),
      signal_strength: -32 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -33 },
    { date: new Date('Thu Nov 19 2015 16:57:10 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -63 },
    { date: new Date('Thu Nov 19 2015 16:57:24 GMT+0000 (UTC)'),
      signal_strength: -29 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:39 GMT+0000 (UTC)'),
      signal_strength: -29 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:40 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:40 GMT+0000 (UTC)'),
      signal_strength: -70 },
    { date: new Date('Thu Nov 19 2015 16:57:11 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:41 GMT+0000 (UTC)'),
      signal_strength: -32 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:41 GMT+0000 (UTC)'),
      signal_strength: -31 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:43 GMT+0000 (UTC)'),
      signal_strength: -32 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:43 GMT+0000 (UTC)'),
      signal_strength: -63 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:45 GMT+0000 (UTC)'),
      signal_strength: -30 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:45 GMT+0000 (UTC)'),
      signal_strength: -66 },
    { date: new Date('Thu Nov 19 2015 16:57:39 GMT+0000 (UTC)'),
      signal_strength: -61 },
    { date: new Date('Thu Nov 19 2015 16:58:24 GMT+0000 (UTC)'),
      signal_strength: -56 },
    { date: new Date('Thu Nov 19 2015 16:59:39 GMT+0000 (UTC)'),
      signal_strength: -51 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:46 GMT+0000 (UTC)'),
      signal_strength: -55 },
    { date: new Date('Thu Nov 19 2015 16:57:17 GMT+0000 (UTC)'),
      signal_strength: -27 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:47 GMT+0000 (UTC)'),
      signal_strength: -77 },
    { date: new Date('Thu Nov 19 2015 16:58:16 GMT+0000 (UTC)'),
      signal_strength: -35 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:51 GMT+0000 (UTC)'),
      signal_strength: -71 },
    { date: new Date('Thu Nov 19 2015 16:58:08 GMT+0000 (UTC)'),
      signal_strength: -61 },
    { date: new Date('Thu Nov 19 2015 16:58:49 GMT+0000 (UTC)'),
      signal_strength: -52 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:54 GMT+0000 (UTC)'),
      signal_strength: -32 } ],
  [ { date: new Date('Thu Nov 19 2015 16:56:55 GMT+0000 (UTC)'),
      signal_strength: -44 },
    { date: new Date('Thu Nov 19 2015 16:57:35 GMT+0000 (UTC)'),
      signal_strength: -36 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:04 GMT+0000 (UTC)'),
      signal_strength: -28 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:04 GMT+0000 (UTC)'),
      signal_strength: -27 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:13 GMT+0000 (UTC)'),
      signal_strength: -34 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:20 GMT+0000 (UTC)'),
      signal_strength: -31 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:31 GMT+0000 (UTC)'),
      signal_strength: -33 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:44 GMT+0000 (UTC)'),
      signal_strength: -27 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:45 GMT+0000 (UTC)'),
      signal_strength: -72 },
    { date: new Date('Thu Nov 19 2015 16:58:23 GMT+0000 (UTC)'),
      signal_strength: -37 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:54 GMT+0000 (UTC)'),
      signal_strength: -71 } ],
  [ { date: new Date('Thu Nov 19 2015 16:57:59 GMT+0000 (UTC)'),
      signal_strength: -35 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:01 GMT+0000 (UTC)'),
      signal_strength: -74 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:07 GMT+0000 (UTC)'),
      signal_strength: -66 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:16 GMT+0000 (UTC)'),
      signal_strength: -56 },
    { date: new Date('Thu Nov 19 2015 16:58:48 GMT+0000 (UTC)'),
      signal_strength: -46 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:20 GMT+0000 (UTC)'),
      signal_strength: -35 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:38 GMT+0000 (UTC)'),
      signal_strength: -81 } ],
  [ { date: new Date('Thu Nov 19 2015 16:58:58 GMT+0000 (UTC)'),
      signal_strength: -78 } ],
  [ { date: new Date('Thu Nov 19 2015 16:59:14 GMT+0000 (UTC)'),
      signal_strength: -41 } ],
  [ { date: new Date('Thu Nov 19 2015 17:00:00 GMT+0000 (UTC)'),
      signal_strength: -80 } ] ];


    return trajectoriesCodec.encode(trajectories)
    .then(function (encoded) {

        return trajectoriesCodec.decode(encoded)
        .then(function (decoded) {

            expect(JSON.stringify(shrinker(decoded))).to.be.equal(JSON.stringify(shrinker(trajectories)));
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
});


it('should delete useless measurements', function () {

  var opts = {
    precisionSignalStrength: 2,
    precisionDate: 30
  };

  var measurements = [
    [
      {date: new Date("2015-12-02T15:18:30.000Z"), signal_strength: -68},
      {date: new Date("2015-12-02T15:18:30.000Z"), signal_strength: -64},
      {date: new Date("2015-12-02T15:18:30.000Z"), signal_strength: -71},
      {date: new Date("2015-12-02T15:20:30.000Z"), signal_strength: -70},
      {date: new Date("2015-12-02T15:35:00.000Z"), signal_strength: -60}
    ],
    [
      {date: new Date("2015-12-02T15:59:30.000Z"), signal_strength: -68},
      {date: new Date("2015-12-02T15:59:40.000Z"), signal_strength: -60},
      {date: new Date("2015-12-02T15:59:50.000Z"), signal_strength: -65},
      {date: new Date("2015-12-02T16:00:00.000Z"), signal_strength: -64},
      {date: new Date("2015-12-02T17:00:30.000Z"), signal_strength: -63}
    ]
  ];

  var correct = [
    [
      {date: new Date("2015-12-02T15:18:30.000Z"), signal_strength: -68},
      {date: new Date("2015-12-02T15:20:30.000Z"), signal_strength: -70},
      {date: new Date("2015-12-02T15:35:00.000Z"), signal_strength: -60}
    ],
    [
      {date: new Date("2015-12-02T15:59:30.000Z"), signal_strength: -68},
      {date: new Date("2015-12-02T16:00:00.000Z"), signal_strength: -64}
    ]
  ];

  return trajectoriesCodec.encode(measurements, opts)
  .then(function (encoded) {
    return trajectoriesCodec.decode(encoded, opts)
    .then(function (decoded) {
      expect(JSON.stringify(decoded)).to.be.equal(JSON.stringify(correct));
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
