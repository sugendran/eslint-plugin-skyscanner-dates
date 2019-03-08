const { parse } = require('url');
const winston = require('winston');

const logger = winston;

/**
 * Parses url and returns the hostname. THIS FUNCTION IS JUST AN EXAMPLE, REPLACE IT WITH YOUR CODE.
 * @param {string} url - Full URL including protocol.
 * @returns {string} Hostname part of the URL.
 */
function getHostname(url) {
  logger.debug(`Parsing url ${url}`);
  return parse(url).host;
}

module.exports = getHostname;
