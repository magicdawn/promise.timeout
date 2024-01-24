const ptimeout = require('../')
const should = require('should')

describe('simple use', function () {
  it('it works', async () => {
    // a function will cost 20ms
    function test() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(20)
        }, 20)
      })
    }

    const test10 = ptimeout(test, 10)
    const test50 = ptimeout(test, 50)

    // 10 timeout
    try {
      await test10()
    } catch (e) {
      e.should.be.ok()
      e.should.be.instanceof(ptimeout.TimeoutError)
      e.message.should.match(/timeout/)
      e.timeout.should.equal(10)
    }

    // 50 ok
    const _50 = await test50()
    _50.should.be.ok()
    _50.should.equal(20)
  })

  it('TimeoutError extends Error', function () {
    const e = new ptimeout.TimeoutError(10)
    e.should.be.instanceof(Error)
    e.timeout.should.equal(10)
    e.message.should.match(/timeout of 10ms exceed/)
  })

  it('AbortSignal works', async () => {
    // a function will cost 20ms
    function test(signal) {
      return new Promise(function (resolve, reject) {
        const timer = setTimeout(function () {
          resolve(20)
        }, 20)

        // custom clean
        signal.addEventListener('abort', () => {
          clearTimeout(timer)
        })
      })
    }

    const test10 = ptimeout(test, 10)
    try {
      await test10()
    } catch (e) {
      e.should.ok()
    }
  })

  it('should clear the timer', async () => {
    function test(singal) {
      return new Promise(function (resolve, reject) {
        const timer = setTimeout(function () {
          reject(new Error('boom'))
        }, 20)

        // clean
        singal.addEventListener('abort', () => {
          clearTimeout(timer)
        })
      })
    }

    const test10 = ptimeout(test, 10)
    const test50 = ptimeout(test, 50)

    try {
      await test10()
    } catch (e) {
      e.should.instanceof(ptimeout.TimeoutError)
    }

    try {
      await test50()
    } catch (e) {
      e.should.instanceof(Error)
      e.message.should.equal('boom')
    }
  })

  it('none async function works too', async () => {
    const fn = () => 10
    const fnWithTimeout = ptimeout(fn, 10)
    const ret = await fnWithTimeout()
    ret.should.eql(10)
  })
})
