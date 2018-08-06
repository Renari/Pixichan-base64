/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */

/**
 * Module dependecies
 * @private
 */

const Request = require('request-promise');

/**
 * Represent of PixiChan
 * @constructor
 * @param {string} url - URL of pixiv images
 */

/**
  * Represent of Symbol to create private scope
  */
const __url = Symbol('url');

/**
 * @class PixiChan
 */
class PixiChan {
  constructor(url) {
    return new Promise((resolve, reject) => {
      const _re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/; // lgtm [js/regex/duplicate-in-character-class]
      if (typeof url !== 'string') {
        try {
          throw new TypeError(`Expected string but got ${typeof (url)}`);
        } catch (e) {
          return reject(e);
        }
      }
      if (!_re.test(url)) {
        try {
          throw new TypeError('Invalid URL of Pixiv image. ');
        } catch (e) {
          return reject(e);
        }
      }
      /** @protected */
      this[__url] = url;
      const R = Request.defaults({
        headers: {
          referer: 'https://www.pixiv.net',
        },
        encoding: null,
      });
      R.get(this[__url]).then((response) => {
        const Img = Buffer.from(response, 'binary').toString('base64');
        return resolve(Img);
      }).catch((err) => {
        return reject(err);
      });
      // this = opts;
    });
  }
}

module.exports = (url) => {
  return new PixiChan(url);
};
