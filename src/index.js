const bigInt = require('big-integer');
const bases = require('bases');
const baseConverter = require('bigint-base-converter');

const prefix = 'l';
const labelAlphabet = '_-0123456789abcdefghijklmnopqrstuvwxyz';
const base36Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

module.exports = {prefix, encode, decode, labelAlphabet};

function encode(toEncode, originCharacters) {
  const bigIntArg = toEncode.split('').reduce((memo, char) => {
    const index = originCharacters.indexOf(char);

    if (index === -1) {
      throw new TypeError(`Character ${char} is not in character set ${originCharacters}`);
    }

    return memo + `<${index}>`;
  }, '');

  let encodedVal;
  try {
    encodedVal = bigInt(bigIntArg, originCharacters.length);
  } catch (e) {
    throw new TypeError(`${uuid} is not a valid base ${base} string.`);
  }

  let str = '';

  do {
    str = labelAlphabet.substr(encodedVal.mod(labelAlphabet.length).valueOf(), 1) + str;
    encodedVal = encodedVal.divide(labelAlphabet.length);
  } while (encodedVal.greater(0));

  return prefix + str;
}

function decode(encoded, originCharacters) {
  let decodedVal = bigInt(0);

  const str = encoded.slice(1, encoded.length);
  const len = str.length;

  for (let pos = 0; pos < len; pos += 1) {
    const ch = str.substr(pos, 1);
    const encPos = labelAlphabet.indexOf(ch);

    if (encPos < 0) {
      throw new Error('Invalid encoded data');
    }

    decodedVal = decodedVal.add(encPos);

    if (pos < len - 1) {
      decodedVal = decodedVal.multiply(labelAlphabet.length);
    }

  }

  return decodedVal.toArray(originCharacters.length).value.map(digit => originCharacters[digit]).join('');
}
