const UuidEncoder = require('uuid-encoder');

const prefix = 'l';

let lowerCase = '';

for (let i = 0; i < 26; i++) {
  lowerCase = lowerCase.concat(String.fromCharCode(97 + i));
}

const characters = '_-0123456789' + lowerCase;

const encoder = new UuidEncoder(characters);

module.exports = {prefix, encode, decode, characters};

function encode(str) {
  try {
    return prefix + encoder.encode(str);
  } catch (e) {
    throw new TypeError('Encode must be called with a valid uuid.');
  }
}

function decode(str) {
  return encoder.decode(str.slice(1, str.length));
}
