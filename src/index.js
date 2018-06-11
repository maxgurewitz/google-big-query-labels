const uuidEncoder = require('uuid-encoder');

const prefix = 'l';

let lowerCase = '';

for (let i = 0; i < 26; i++) {
  lowerCase = lowerCase.concat(String.fromCharCode(97 + i));
}

const characters = '_-0123456789' + lowerCase;

module.exports = {prefix, encode, decode, characters};

function encode() {
}

function decode() {
}
