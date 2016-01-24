# Jasmine Node Promise Matchers

> Custom jasmine matchers for javascript Promises.

[![Build Status](https://travis-ci.org/agirorn/jasmine-node-promise-matchers.svg?branch=master)](https://travis-ci.org/agirorn/jasmine-node-promise-matchers)

## Install

Get it from npm.

```js
npm i jasmine-node-promise-matchers --save-dev
```

Add matchers to tests

```js
beforeEach(function() {
  jasmine.addMatchers(require('jasmine-node-promise-matchers'));
});
```

## Usage

```js
it('resolves', function(done) {
  var deferred = new Promise(function(resolve) {
    resolve();
  });

  expect(deferred).toResolve(done)
});

it('resolves with value', function(done) {
  var deferred = new Promise(function(resolve) {
    resolve('value');
  });

  expect(deferred).toResolveWith('value', done)
});

it('rejects', function(done) {
  var deferred = new Promise(function(resolve, reject) {
    reject();
  });

  expect(deferred).toResolve(done)
});

it('rejects with value', function(done) {
  var deferred = new Promise(function(resolve, reject) {
    reject('value');
  });

  expect(deferred).toResolveWith('value', done)
});
```

## License

ISC
