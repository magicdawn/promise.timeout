# Changelog

## v0.2.1 2018-08-26

- update deps & clean up code
- use prettier

## v0.2.0 2017-04-12

- back to istanbul, rm `nyc`
- rm `babel-eslint`, use eslint ecmaVersion = 8

## v0.1.2 2016-11-12
- use `async/await` instead of `co-mocha`
- use `nyc` instead of `istanbul`
- use `semi: [error, never]` code style

## v0.1.1 2016-06-27
- fix `deps` mistake

## v0.1.0 2016-06-02
- when not timeout, clear the `reject(TimeoutError)` timer

## v0.0.3 2016-06-01
- add `onCancel` to support clean up
- use esformatter, remove jsbeautify

## v0.0.2 2016-05-15
- make `ptimeout.TimeoutError` inherits from `Error`

## v0.0.1 2016-05-13
- first publish