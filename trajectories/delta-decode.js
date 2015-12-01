"use strict";

var varInt = require('./varInt');


/*
    buffer
    returns an array of integers [0, 2^31-1]
*/

var HIGH_MASK = 0xF0;
var LOW_MASK = 0x0F;
var ESCAPE_VALUE = 0x08;
var VARINT_LAST_MASK = 0x80;

function fourBitSigned(nb) { // Set the value of the 4th less significant bit to -8 instead of 8
    return (nb & 0x0F) - ((nb & 0x08) << 1);
}

module.exports = function(buffer){

    if (!buffer || !buffer.length)
        return undefined;

    var arr = [];
    var previousValue;
    var tmpVarInt = [];

    Array.prototype.forEach.call(buffer, function(byte){
        if(previousValue === undefined){
            if (byte & VARINT_LAST_MASK) { // End of the varInt
                tmpVarInt.push(byte & ~VARINT_LAST_MASK); // Add the value without the varint mask
                var value = varInt.decode(new Buffer(tmpVarInt));
                arr.push(value);
                tmpVarInt = [];
                previousValue = value;
            }
            else { // varInt not over yet
                tmpVarInt.push(byte);
            }
        }
        else{
            var highDelta = (byte & HIGH_MASK) >> 4;
            if(highDelta === ESCAPE_VALUE){ // escape value
                previousValue = undefined;
                return;
            }
            else{
                var v = previousValue + fourBitSigned(highDelta);
                arr.push(v);
                previousValue = v;
            }

            var lowDelta = (byte & LOW_MASK);
            if(lowDelta === ESCAPE_VALUE){ // escape value
                previousValue = undefined;
                return;
            }
            else{
                var val = previousValue + fourBitSigned(lowDelta);
                arr.push(val);
                previousValue = val;
            }
        }

    });

    if (tmpVarInt.length) {
        var value = varInt.decode(new Buffer(tmpVarInt));
        arr.push(value);
    }

    return arr;
};
