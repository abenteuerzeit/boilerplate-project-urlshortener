const dns = require('dns');
const url = require('url');
const VALID_URL_PATTERN = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(?::\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/i;

class URLValidator {
  constructor(inputURL) {
    this.inputURL = inputURL;
  }

  validate() {
    this.checkURLPattern();
    return this.checkDomainResolvability();
  }

  checkURLPattern() {
    if (!VALID_URL_PATTERN.test(this.inputURL)) throw new Error('Invalid URL Format');
    if (!url.parse(this.inputURL).hostname) throw new Error('Invalid URL Format');
  }

  checkDomainResolvability() {
    return new Promise((resolve, reject) => {
      dns.lookup(url.parse(this.inputURL).hostname, (err) => {
        if (err) reject(new Error('Domain Not Resolvable'));
        else resolve(true);
      });
    });
  }
}

module.exports = URLValidator;
