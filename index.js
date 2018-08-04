/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */

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
    const _re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (typeof url !== 'string') {
      try {
        throw new TypeError(`Expected string but got ${typeof (url)}`);
      } catch (e) {
        console.log(e);
      }
      return;
    }
    if (!_re.test(url)) {
      try {
        throw new TypeError('Invalid URL of Pixiv image. ');
      } catch (e) {
        console.log(e);
      }
      return;
    }
    /** @protected */
    this[__url] = url;
    // this = opts;
  }

  init() {
    return new Promise((resolve, reject) => {
      const R = Request.defaults({
        headers: {
          referer: 'https://www.pixiv.net',
        },
        encoding: null,
      });
      R.get(this[__url]).then((response) => {
        const Img = Buffer.from(response, 'binary').toString('base64');
        resolve(Img);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = (url) => {
  return new PixiChan(url)
    .init();
};
