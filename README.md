# promise.timeout
> add timeout support for async function

[![Build Status](https://img.shields.io/travis/magicdawn/promise.timeout.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.timeout)
[![Coverage Status](https://img.shields.io/coveralls/magicdawn/promise.timeout.svg?style=flat-square)](https://coveralls.io/github/magicdawn/promise.timeout?branch=master)
[![npm version](https://img.shields.io/npm/v/promise.timeout.svg?style=flat-square)](https://www.npmjs.com/package/promise.timeout)
[![npm downloads](https://img.shields.io/npm/dm/promise.timeout.svg?style=flat-square)](https://www.npmjs.com/package/promise.timeout)
[![npm license](https://img.shields.io/npm/l/promise.timeout.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Note
this is target ES5 environment.

## Install
```
$ npm i promise.timeout --save
```

## API

`ptimeout(fn, timeout)`
- `fn` the async function
- `timeout` in ms

```js
var ptimeout = require('promise.timeout');

// a function will cost 20ms
function test() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(20);
    }, 20);
  });
}

const test10 = ptimeout(test, 10);
const test50 = ptimeout(test, 50);

// 10 timeout
try {
  yield test10();
} catch (e) {
  e.should.be.ok();
  e.should.be.instanceof(ptimeout.TimeoutError);
  e.message.should.match(/timeout/);
  e.timeout.should.equal(10);
}

// 50 ok
const _50 = yield test50();
_50.should.be.ok();
_50.should.equal(20);
```


## See Also

- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](ttps://github.com/magicdawn/promise.ify)

## License

the MIT License http://magicdawn.mit-license.org
