## Note

this is target ES5 environment.

## API

```js
var ptimeout = require('promise.timeout')
```

`ptimeout(fn, timeout, cancel)`

- `fn` the async function
- `timeout` in ms
- `cancel` Boolean, whether support onCancel

```js
var ptimeout = require('promise.timeout')

// a function will cost 20ms
function test() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
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

### onCancel

1. pass `cancel = true` to `ptimeout(fn, ms, cancel)`
2. use `onCancel` para to register clean callback

```js
var ptimeout = require('promise.timeout')

// a function will cost 20ms
function test(onCancel) {
  return new Promise(function(resolve, reject) {
    var timer = setTimeout(function() {
      resolve(20)
    }, 20)

    // custom clean
    onCancel &&
      onCancel(() => {
        clearTimeout(timer)
      })
  })
}

var test10 = ptimeout(test, 10, true) // enable cancel
try {
  await test10()
} catch (e) {
  e.should.ok()
}
```

## FAQ

### Q: Why onCancel

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

## See Also

- [promise.timeout](https://github.com/magicdawn/promise.timeout)
- [promise.retry](https://github.com/magicdawn/promise.retry)
- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](https://github.com/magicdawn/promise.ify)
- [promise.cb](https://github.com/magicdawn/promise.cb)
- [promise.obj](https://github.com/magicdawn/promise.obj)
- [promise.sleep](https://github.com/magicdawn/promise.sleep)
