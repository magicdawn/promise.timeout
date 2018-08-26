const fmt = require('util').format
const inherits = require('util').inherits

module.exports = promiseTimeout
module.exports.TimeoutError = TimeoutError

function promiseTimeout(fn, timeout, cancel) {
  return function() {
    const ctx = this
    const args = [].slice.call(arguments)

    // provide onCancel
    let cancelFn
    if (cancel) {
      args.push(function onCancel(fn) {
        cancelFn = fn
      })
    }

    return new Promise(function(resolve, reject) {
      // timeout
      const timer = setTimeout(function() {
        // reject
        const e = new TimeoutError(timeout)
        reject(e)

        // clean up if possible
        cancel && cancelFn && process.nextTick(cancelFn)
      }, timeout)

      // clear
      fn.apply(ctx, args).then(
        function(result) {
          clearTimeout(timer)
          resolve(result)
        },
        function(err) {
          clearTimeout(timer)
          reject(err)
        }
      )
    })
  }
}

/**
 * Error def
 */

function TimeoutError(timeout) {
  Error.call(this)
  this.timeout = timeout
  this.message = fmt('timeout of %sms exceed', timeout)
  Error.captureStackTrace(this, TimeoutError)
}

inherits(TimeoutError, Error)
