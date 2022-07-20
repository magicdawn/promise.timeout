<!-- AUTO_GENERATED_UNTOUCHED_FLAG -->

# promise.timeout

> add timeout support for async function

[![Build Status](https://img.shields.io/travis/magicdawn/promise.timeout.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.timeout)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/promise.timeout.svg?style=flat-square)](https://codecov.io/gh/magicdawn/promise.timeout)
[![npm version](https://img.shields.io/npm/v/promise.timeout.svg?style=flat-square)](https://www.npmjs.com/package/promise.timeout)
[![npm downloads](https://img.shields.io/npm/dm/promise.timeout.svg?style=flat-square)](https://www.npmjs.com/package/promise.timeout)
[![npm license](https://img.shields.io/npm/l/promise.timeout.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ npm i -S promise.timeout
```

## Note

this is target ES5 environment.

## API

```js
var ptimeout = require('promise.timeout')
```

`ptimeout(fn, timeout)`

- `fn` the async function
- `timeout` in ms

```js
var ptimeout = require('promise.timeout')

// a function will cost 20ms
function test() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(20)
    }, 20)
  })
}

var test10 = ptimeout(test, 10)
var test50 = ptimeout(test, 50)

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
var _50 = await test50()
_50.should.be.ok()
_50.should.equal(20)
```

### singal

ptimeout will provide an extra runtime argument `signal: AbortSignal`, you can use the signal to register abort action.
when timeout reached, the abort action will be executed

```js
var ptimeout = require('promise.timeout')

// a function will cost 20ms
function test(signal) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      resolve(20)
    }, 20)

    // clean up
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
    })
  })
}

var test10 = ptimeout(test, 10)
try {
  await test10()
} catch (e) {
  e.should.ok()
}
```

## FAQ

### Q: why move to `AbortController`

### A:

- easy to type, easy to strip signal argument, easy to use with TypeScript
- AND it's shiped in Node.js https://nodejs.org/api/globals.html#class-abortcontroller
- for browser, users should consider a polyfill for `AbortController` & `AbortSignal` if not provided nativly

<details><summary>old version use `onCancel` to register clean up action</summary>

### Q: <del>Why onCancel</del>

### A: Think `onCancel` like the AbortController

with `AbortController` you need to

```js
function normalFn(a, r, g, s, controller: AbortController) {
  controller.signal.addEventListener('abort', () => {
    // cancel operations that starts in `normalFn` body
  })
}
```

- and `ptimeout` will call the `controller.abort()` if any timeout exceeds
- and with `onCancel`, you provide a cancel operation to ptimeout, ptimeout will call that

That's the same, and I don't want to depend on an extra package [abort-controller](https://github.com/mysticatea/abort-controller)

</details>

## See Also

- [promise.timeout](https://github.com/magicdawn/promise.timeout)
- [promise.retry](https://github.com/magicdawn/promise.retry)
- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](https://github.com/magicdawn/promise.ify)
- [promise.cb](https://github.com/magicdawn/promise.cb)
- [promise.obj](https://github.com/magicdawn/promise.obj)
- [promise.sleep](https://github.com/magicdawn/promise.sleep)

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
