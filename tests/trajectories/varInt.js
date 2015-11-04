"use strict";

require('es6-shim');

var assert = assert = require('chai').assert;

var varInt = require('../../trajectories/varInt.js');

describe('trajectories/varInt', function(){
   
    it('should refuse to encode a wrong variable', function() {

        assert.throw(function () {
            return varInt.encode(Math.pow(2, 45));
        }, /.*/);

        assert.throw(function () {
            return varInt.encode('wrong');
        }, /.*/);

        assert.throw(function () {
            return varInt.encode({should: 'fail'});
        }, /.*/);

        assert.throw(function () {
            return varInt.encode(-1);
        }, /.*/);

        assert.throw(function () {
            return varInt.encode(Infinity);
        }, /.*/);

        assert.throw(function () {
            return varInt.encode(undefined);
        }, /.*/);

    });

    it('should refuse to decode a wrong variable', function() {
        assert.throw(function () {
            return varInt.decode('wrong');
        }, /.*/);

        assert.throw(function () {
            return varInt.decode({should: 'fail'});
        }, /.*/);

        assert.throw(function () {
            return varInt.decode(-1);
        }, /.*/);

        assert.throw(function () {
            return varInt.decode(Infinity);
        }, /.*/);

        assert.throw(function () {
            return varInt.decode(undefined);
        }, /.*/);

    });
    
    it('should encode and decode any value in [0, 2^31 - 1]', function() {
        var rand;
        for (var i = 0; i < 1000; i++) {
            rand = Math.random().toString(10).slice(2) % (1 << 31 - 1);
            assert.strictEqual(varInt.decode(varInt.encode(rand)), rand);
        }
    });
});
