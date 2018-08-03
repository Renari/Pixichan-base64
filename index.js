/**
 * Module dependecies
 * @private 
 */
const Request = require('request-promise')
const { Url } = require('url')

/**
 * Represent of PixiChan 
 * @constructor
 * @param {string} url - URL of pixiv images
 */

class PixiChan{
   constructor(url, opts = {value : 'image'}){
      const _re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      if(typeof url !== 'string'){
         try{
            throw new TypeError(`Expected string but got ${typeof(url)}`)
         }
         catch(e){
            console.log(e)
         }
      }
      if(!_re.test(url)){
         try{
            throw new TypeError(`Invalid URL`)
         }
         catch(e){
            console.log(e)
         }
      }
   }
}
/*
   PixiChan(url, options)
      .then((results)=> log(results))
*/
