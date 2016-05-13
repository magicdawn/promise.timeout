'use strict';

/**
 * module dependencies
 */

var fmt = require('util').format;

/**
 * exports
 */

module.exports = promiseTimeout;
module.exports.TimeoutError = TimeoutError;

/**
 * main
 */

function promiseTimeout(fn, timeout) {
  return function() {
    var ctx = this;
    var args = [].slice.call(arguments);
    return new Promise(function(resolve, reject) {
      fn.apply(ctx, args).then(resolve, reject);
      setTimeout(function() {
        var e = new TimeoutError(timeout);
        reject(e);
      }, timeout);
    });
  };
}

/**
 * Error def
 */

function TimeoutError(timeout) {
  this.timeout = timeout;
  this.message = fmt('timeout of %s ms exceed', timeout);
  Error.captureStackTrace(this, TimeoutError);
}