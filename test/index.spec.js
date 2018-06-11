const uuidv1 = require('uuid/v1');
const {expect} = require('chai');
const {characters, encode, decode, prefix} = require('../src/index.js');

describe('when provided a string to encode', () => {

  it('throws an exception when not provided a uuid', () => {
    const nonUuid = 'non uuid string';
    expect(() => encode(nonUuid)).to.throw();
  });

  it('encoded string only contains approved characters', () => {
    const original = uuidv1();
    const encoded = encode(original);
    const filteredEncoded = encoded.split('')
      .filter(char => characters.includes(char));
    expect(filteredEncoded).to.have.lengthOf(encoded.length);
  });

  it('encoded string starts with a lower case letter', () => {
    const original = uuidv1();
    const encoded = encode(original);
    expect(encoded[0]).to.equal(prefix);
    expect(prefix).to.match(/[a-z]/);
  });
});

describe('when provided a string to decode', () => {

  it('returns original value when provided a standard base16 encoded uuid', () => {
    const original = uuidv1();
    const encoded = encode(original);
    const decoded = decode(encoded);

      // -384adb06-dc21-1e88-ea46-d46a7c19ffd
      // +0384adb0-6dc2-11e8-8ea4-6d46a7c19ffd
    expect(decoded).to.equal(original);
  });

  describe('returns original when provided a base64 encoded string', () => {
    // const base64Encoded = 'IQFQZGazYDgTQbjLpte43jNLbw';
    const base64Encoded = 'A';
    const encoded = encode(base64Encoded, 64);
    const decoded = decode(encoded, 64, false);
    expect(decoded).to.equal(base64Encoded);
  });
});
