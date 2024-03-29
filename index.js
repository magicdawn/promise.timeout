function checkAbortController() {
  if (
    typeof AbortController === 'undefined' ||
    typeof AbortSignal === 'undefined'
  ) {
    console.error('[promise.timeout] need global AbortController & AbortSingal')
  }
}

function ptimeout(fn, timeout) {
  return function () {
    var ctx = this
    var args = [].slice.call(arguments)

    // provide signal
    checkAbortController()
    var controller = new AbortController()
    args.push(controller.signal)

    return new Promise(function (resolve, reject) {
      // timeout
      var timer = setTimeout(function () {
        // reject
        var e = new TimeoutError(timeout)
        reject(e)

        // abort excuting task
        controller.abort()
      }, timeout)

      Promise.resolve(fn.apply(ctx, args)).then(
        // resolve
        function (result) {
          clearTimeout(timer)
          resolve(result)
        },

        // reject
        function (err) {
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

class TimeoutError extends Error {
  constructor(timeout) {
    super()
    this.timeout = timeout
    this.message = `timeout of ${timeout}ms exceed`
    Error.captureStackTrace(this, TimeoutError)
  }
}

module.exports = ptimeout
module.exports.TimeoutError = TimeoutError
