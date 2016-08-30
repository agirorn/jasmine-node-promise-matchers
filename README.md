[![npm version](https://badge.fury.io/js/jasmine-node-promise-matchers.svg)](https://badge.fury.io/js/jasmine-node-promise-matchers)
[![Build Status](https://travis-ci.org/agirorn/jasmine-node-promise-matchers.svg?branch=master)](https://travis-ci.org/agirorn/jasmine-node-promise-matchers)

# Jasmine Node Promise Matchers

> Custom jasmine matchers for javascript Promises.

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
it('is thenable', function() {
  var deferred = Promise.resolve();
  var thenable = { then: function () {} };

  expect(deferred).toBeThenable();
  expect(thenable).toBeThenable();
});

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

  expect(deferred).toReject(done)
});

it('rejects with value', function(done) {
  var deferred = new Promise(function(resolve, reject) {
    reject('value');
  });

  expect(deferred).toRejectWith('value', done)
});
```

## License

ISC
