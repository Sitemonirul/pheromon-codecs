"use strict";

require('es6-shim');

var assert = assert = require('chai').assert;

var deltaEncode = require('../../trajectories/delta-encode');
var deltaDecode = require('../../trajectories/delta-decode');

var VARINT_LAST_MASK = 0x80;

describe('trajectories/delta-decode (v2)', function(){
    
    it('[10]', function(){
        var arr = [10];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });
    
    it('[10, 10]', function(){
        var arr = [10, 10];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });
    
    it('[10, 10, 30]', function(){
        var arr = [10, 10, 30];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });
    
    it('[10, 10, 30, 50]', function(){
        var arr = [10, 10, 30, 50];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });
    
    it('[10, 10, 30, 50, 51, 52]', function(){
        var arr = [10, 10, 30, 50, 51, 52];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });
    
    it('[1234567, 1234569, 1, 3, 5]', function(){
        var arr = [1234567, 1234569, 1, 3, 5];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });

    it('[42, 30, 2, 5, 60, 55]', function(){
        var arr = [42, 30, 2, 5, 60, 55];
        var res = deltaDecode( deltaEncode(arr) );
        
        assert.sameMembers(arr, res);
    });

    
});
