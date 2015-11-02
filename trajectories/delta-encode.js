"use strict";

var varInt = require('./varInt');
var ESCAPE_VALUE = 0x08; // -8 in 4bit signed binary
/*
    values is an asc sorted array of integer [0, 2^31-1]
    delta encoding consists in providing the first value and then only increments to the previous value.
    increments are stored in 4-bits. 0b1000 is an escape value if the delta between 2 values is not in [-7, 7]; in that case, the next byte is a new value
*/

module.exports = function(values){
    // allocate a buffer purposefully too big
    var buffer = new Buffer(2*values.length);
    var nextIndex = 0;
    var byteBeingBuilt;
    var previousValue; // undefined indicates next values should be written in full, not delta
    var vint;
    
    values.forEach(function(v){
        if (previousValue === undefined){
            vint = varInt.encode(v);

            vint.copy(buffer, nextIndex, 0, varInt.length(vint));
            nextIndex += varInt.length(vint);
            previousValue = v;
            return;
        }
        
        var delta = v - previousValue;
        
        if(delta > 7 || delta < -7) {
            // write ESCAPE_VALUE
            if(byteBeingBuilt !== undefined)
                byteBeingBuilt += ESCAPE_VALUE;
            else
                byteBeingBuilt = ESCAPE_VALUE << 4;
            
            buffer.writeUInt8(byteBeingBuilt, nextIndex++);

            // Write full value (varInt)
            vint = varInt.encode(v);
            vint.copy(buffer, nextIndex, 0, varInt.length(vint));
            nextIndex += varInt.length(vint);

            byteBeingBuilt = undefined;
        }
        else {
            if(byteBeingBuilt !== undefined){
                byteBeingBuilt += delta & 0x0F;
                buffer.writeUInt8(byteBeingBuilt, nextIndex++);
                byteBeingBuilt = undefined;
            }
            else
                byteBeingBuilt = (delta & 0x0F) << 4;
        }
        
        previousValue = v;
            
    });
    
    // in case we ended with a leftover semi-byte, pad with ESCAPE_VALUE
    if(byteBeingBuilt !== undefined){
        byteBeingBuilt += ESCAPE_VALUE;
        buffer.writeUInt8(byteBeingBuilt, nextIndex++);
        byteBeingBuilt = undefined;
    }
    
    return buffer.slice(0, nextIndex);
};
