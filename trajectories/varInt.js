'use strict'

function printBinBuff (buff) {
    console.log(("00000000" + parseInt(buff.toString('hex'), 16).toString(2)).substr(-8 * buff.length));
}

function varIntLength (buff) {
    if (!buff || !Buffer.isBuffer(buff))
        return 0;

    // Get the length. Bytes after the MSB signed one are ignored
    for (var len = 0; len < buff.length; len++) {
        if (buff[len] & 0x80)
            return len + 1;
    }
    return buff.length;
}

// Can only encode values in [0, 2^31 - 1]
var encode = function encodeVarint (nb) {
    if (typeof nb !== 'number' || nb === Infinity || nb < 0 || nb >= Math.pow(2, 31)) {
        throw new Error('Cannot encode ' + nb + ' into a Varint buffer');
    }

    var size = 1;
    for (; size <= 16; size++) {
        if ((1 << (7 * size)) > nb) {
            break;
        }
    }

    var buff = new Buffer(size);

    for (var i = 0; i < size; i++) {
        buff.writeUInt8(((nb >> (i * 7)) & 0x7F) | (i === size - 1 ? 0x80 : 0), i);
    }

    return buff;
};

var decode = function decodeVarint (buff) {
    if (!buff || !Buffer.isBuffer(buff)) {
        throw new Error('Cannot decode ' + buff + '. Not a Varint buffer');
    }

    var nb = 0;
    var len = varIntLength(buff);

    for (var i = len; i >= 0; i--) {
        nb <<= 7;
        nb += buff[i] & 0x7F;
    }
    return nb;
};

module.exports = {encode: encode, decode: decode, length: varIntLength};
