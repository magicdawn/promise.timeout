'use strict';

/**
 * module dependencies
 */

var fmt = require('util').format;
var inherits = require('util').inherits;

/**
 * exports
 */

module.exports = promiseTimeout;
module.exports.TimeoutError = TimeoutError;

/**
 * main
 */

function promiseTimeout(fn, timeout, cancel) {
  return function() {
    var ctx = this;
    var args = [].slice.call(arguments);

    // provide onCancel
    var cancelFn;
    if (cancel) {
      args.push(function onCancel(fn) {
        cancelFn = fn;
      });
    }

    return new Promise(function(resolve, reject) {
      fn.apply(ctx, args).then(resolve, reject);
      setTimeout(function() {
        // reject
        var e = new TimeoutError(timeout);
        reject(e);

        // clean up if possible
        cancel && cancelFn && process.nextTick(cancelFn);
      }, timeout);
    });
  };
}

/**
 * Error def
 */

function TimeoutError(timeout) {
  Error.call(this);
  this.timeout = timeout;
  this.message = fmt('timeout of %sms exceed', timeout);
  Error.captureStackTrace(this, TimeoutError);
}

inherits(TimeoutError, Error);