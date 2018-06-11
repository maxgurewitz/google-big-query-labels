const bigInt = require('big-integer');

const prefix = 'l';
const characters = '_-0123456789abcdefghijklmnopqrstuvwxyz';

module.exports = {prefix, encode, decode, characters};

function encode(uuid, base=16) {
  const cleanUuid = uuid.replace(/-/g, '');

  let iUuid;
  try {
    console.log('loc6', base, cleanUuid);
    iUuid = bigInt(cleanUuid, base);
  } catch (e) {
    throw new TypeError(`${uuid} is not a valid base ${base} string.`);
  }
  console.log('loc5', iUuid.toString(10));

  let str = '';

  do {
    str = characters.substr(iUuid.mod(characters.length).valueOf(), 1) + str;
    iUuid = iUuid.divide(characters.length);
  } while (iUuid.greater(0));

  return prefix + str;
}

// FIXME not preserving case
function decode(encoded, base=16, hyphenated=true) {
  let iUuid = bigInt(0);

  const str = encoded.slice(1, encoded.length);
  const len = str.length;

  for (let pos = 0; pos < len; pos += 1) {
    const ch = str.substr(pos, 1);
    const encPos = characters.indexOf(ch);

    if (encPos < 0) {
      throw new Error('Invalid encoded data');
    }

    iUuid = iUuid.add(encPos);

    if (pos < len - 1) {
      iUuid = iUuid.multiply(characters.length);
    }

  }

  const uuid = iUuid.toString(base).padStart(32, '0');

  return hyphenated ?
    `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}` :
    uuid;
}
