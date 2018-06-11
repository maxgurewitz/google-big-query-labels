const uuidv1 = require('uuid/v1');
const {expect} = require('chai');
const {encode, decode, prefix} = require('../src/index.js');

describe('when provided a string to encode', () => {

  it('throws an exception when not provided a uuid', () => {
    const nonUuid = 'non uuid string';
    expect(() => encode(nonUuid)).to.throw('Encode must be called with a valid uuid.');
  });

  it('encoded string only contains approved characters', () => {
  });

  it('encoded string starts with a lower case letter', () => {
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
