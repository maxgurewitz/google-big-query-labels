# google-big-query-labels

A library to encode strings so that they can be written as label metadata on [google big query](https://cloud.google.com/bigquery/) entries.  These labels are have a number of [rules which restrict their usage](https://cloud.google.com/bigquery/docs/creating-managing-labels#requirements), and this package ensure that the encoded string conforms to those rules. This library is useful for encoding Id's.

#### API

Re-encoding strings specifying their original alphabets.

```javascript
const {encode, decode} = require('google-big-query-labels');
const stringToEncode = 'helloworld1';
const base36Alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const encoded = encode(stringToEncode, base36Alphabet); // 'l834pvjszr_n'
decode(encoded, base36Alphabet) // 'helloworld1'
```

Utility function to re-encode strings which are encoded in the base 64 url alphabet.

```javascript
const {encodeBase64Url, decodeBase64Url} = require('google-big-query-labels');
const base64UrlEncoded = 'c29tZWJhc2U2NGVuY29kZWQ';
const encoded = encodeBase64Url(base64UrlEncoded); // 'l-a9qk8gqih_dsohfdkul2gafsz0'
decodeBase64Url(encoded) // 'c29tZWJhc2U2NGVuY29kZWQ'
```
