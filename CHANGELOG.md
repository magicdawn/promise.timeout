# Changelog

## v1.2.0 2024-01-24

- rm `util.format` dep, cjs `require('util').format` imports a lot when used in FE project
- switch to vitest, fix github actions badge

## v1.1.2 2022-11-18

- can not use `global` in browser, use `typeof` to detect `AbortController` & `AbortSignal`

## v1.1.1 2022-11-11

- remove readme folder from publish

## v1.1.0 2022-11-11

- use `export =` for dts file, no required `esModuleInterop` & can work in TypeScript ESM environment

## v1.0.0 2022-07-20

- use `AbortController` & `AbortSignal` replace `onCancel`

## v0.4.2 2020-11-25

- fix `index.d.ts`, use ts@4.0 variadic tuple
- export TimeoutError as class, because usage of `err instanceof ptimeout.TimeoutError`

## v0.4.1 2020-01-21

- re-target ES5

## v0.4.0 2020-01-21

- update A lot, code take from promise.x/promise.timeout

## v0.3.0 2020-01-18

- use `Promise.resolve` to add support none async function in `ptimeout(fn, ...)`
- add `types/index.d.ts` typescript definition, and use `tsd` to check d.ts
- use `nyc` insteadof `istanbul`

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
