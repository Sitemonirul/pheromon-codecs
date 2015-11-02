"use strict";

require('es6-shim');

var assert = assert = require('chai').assert;

var deltaEncode = require('../../trajectories/delta-encode');

var VARINT_LAST_MASK = 0x80;

describe('trajectories/delta-encode (v2)', function(){
    
    it('should encode the unique value if there is only one value', function(){
        var b = deltaEncode([10]);
        
        assert.strictEqual(b.length, 1);
        assert.strictEqual(b[0], 10 | VARINT_LAST_MASK); // don't forget : varInt
    });
    
    it('should encode the value and 0x00 if 3 equal values are passed', function(){
        var b = deltaEncode([14, 14, 14]);
        
        assert.strictEqual(b.length, 2);
        assert.strictEqual(b[0], 14 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x00);
    });
    
    it('should encode the value and 0x10 for [14, 15, 15]', function(){
        var b = deltaEncode([14, 15, 15]);
        
        assert.strictEqual(b.length, 2);
        assert.strictEqual(b[0], 14 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x10);
    });
    
    it('should encode the value and 0x18 for [14, 15]', function(){
        var b = deltaEncode([14, 15]);
        
        assert.strictEqual(b.length, 2);
        assert.strictEqual(b[0], 14 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x18);
    });
    
    it('should encode the 0, 0x80 and 17 for [0, 17]', function(){
        var b = deltaEncode([0, 17]);
        
        assert.strictEqual(b.length, 3);
        assert.strictEqual(b[0], 0 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x80);
        assert.strictEqual(b[2], 17 | VARINT_LAST_MASK);
    });
    
    it('should encode the 0, 0x80, 17, 0x08, 80 for [0, 17, 17, 80]', function(){
        var b = deltaEncode([0, 17, 17, 80]);
        
        assert.strictEqual(b.length, 5);
        assert.strictEqual(b[0], 0 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x80);
        assert.strictEqual(b[2], 17 | VARINT_LAST_MASK);
        assert.strictEqual(b[3], 0x08);
        assert.strictEqual(b[4], 80 | VARINT_LAST_MASK);
    });

    it('should encode big numbers correctly', function () {
        var b = deltaEncode([1234567, 1234569, 0, 3]);

        assert.strictEqual(b.length, 6);
        assert.strictEqual(b[0], 0x07);
        assert.strictEqual(b[1], 0x2d);
        assert.strictEqual(b[2], 0x4b | VARINT_LAST_MASK);
        assert.strictEqual(b[3], 0x28);
        assert.strictEqual(b[4], 0 | VARINT_LAST_MASK);
        assert.strictEqual(b[5], 0x38);
    });

    it('should encode with little negative deltas (>= -7)', function () {
        var b = deltaEncode([42, 40, 10, 10, 8]);

        assert.strictEqual(b.length, 4);
        assert.strictEqual(b[0], 42 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0xe8);
        assert.strictEqual(b[2], 10 | VARINT_LAST_MASK);
        assert.strictEqual(b[3], 0x0e);
    });

    it('should encode with big negative deltas (<= -8)', function () {
        var b = deltaEncode([42, 30, 10, 10, 8]);

        assert.strictEqual(b.length, 6);
        assert.strictEqual(b[0], 42 | VARINT_LAST_MASK);
        assert.strictEqual(b[1], 0x80);
        assert.strictEqual(b[2], 30 | VARINT_LAST_MASK);
        assert.strictEqual(b[3], 0x80);
        assert.strictEqual(b[4], 10 | VARINT_LAST_MASK);
        assert.strictEqual(b[5], 0x0e);
    });
});
