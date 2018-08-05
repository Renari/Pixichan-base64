/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */

const base64 = require('is-base64');
const assert = require('assert');
const Pixichan = require('./index');

const URL = 'https://i.pximg.net/img-original/img/2018/05/25/01/35/43/68906096_p0.png';
describe(`Request to ${URL}`, () => {
  it('Should return base 64', () => {
    return Pixichan(URL).then((response) => {
      assert.equal(base64(response), true);
    });
  });
});
