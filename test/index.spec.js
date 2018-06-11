const uuidv1 = require('uuid/v1');
const {expect} = require('chai');
const {characters, encode, decode, prefix} = require('../src/index.js');

describe('when provided a string to encode', () => {

  it('throws an exception when not provided a uuid', () => {
    const nonUuid = 'non uuid string';
    expect(() => encode(nonUuid)).to.throw('Encode must be called with a valid uuid.');
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

  it('returns original value', () => {
    const original = uuidv1();
    const encoded = encode(original);
    const decoded = decode(encoded);
    expect(decoded).to.equal(original);
  });
});
