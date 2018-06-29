const uuidv1 = require('uuid/v1');
const {expect} = require('chai');
const {encodeBase64Url, decodeBase64Url, labelAlphabet, encode, decode, prefix} = require('../src/index.js');
const base36Alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

describe('when labeling google big query metadata', () => {
  describe('when provided a string to encode', () => {

    it('throws an when provided chars not in the alphabet', () => {
      const nonUuid = '$%!';
      expect(() => encode(nonUuid, 'abc')).to.throw();
    });

    it('encoded string only contains approved characters', () => {
      const original = uuidv1().replace(/-/g, '');
      const encoded = encode(original, base36Alphabet);
      const filteredEncoded = encoded.split('')
        .filter(char => labelAlphabet.includes(char));
      expect(filteredEncoded).to.have.lengthOf(encoded.length);
    });

    it('encoded string starts with a lower case letter', () => {
      const original = uuidv1().replace(/-/g, '');
      const encoded = encode(original, base36Alphabet);
      expect(encoded[0]).to.equal(prefix);
      expect(prefix).to.match(/[a-z]/);
    });
  });

  describe('when provided a string to decode', () => {
    it('returns original when provided a base64 encoded string', () => {
      const base64Encoded = 'IQFQZGazYDgTQbjLpte43jNLbw';
      const encoded = encode(base64Encoded, base64Alphabet);
      const decoded = decode(encoded, base64Alphabet);
      expect(decoded).to.equal(base64Encoded);
    });

    it('returns original when provided a base64Url encoded string', () => {
      const toEncode = 'IQFQZGazYDgTQbjLpte43jNLbw-_';
      const encoded = encodeBase64Url(toEncode);
      const decoded = decodeBase64Url(encoded);
      expect(decoded).to.equal(toEncode);
    });

    it("Does not remove A's from base64Url encoded strings", () => {
      const toEncode = 'AQIc2RJWLGf7DfSBX1_-zjJqIg';
      const encoded = encodeBase64Url(toEncode);
      const decoded = decodeBase64Url(encoded);
      expect(decoded).to.equal(toEncode);
    });
  });
});
