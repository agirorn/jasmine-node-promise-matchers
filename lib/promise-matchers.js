/*
 * jasmine-node-promise-matchers
 * https://github.com/agirorn/jasmine-node-promise-matchers
 *
 * Copyright (c) 2016 Ægir Örn Símonarson
 * Licensed under the ISC license.
 */

const NestedError = require('nested-error-stacks');
const toString = require('./to-string');
const isEqual = require('./is-equal');

const isFunction = (fun) => typeof (fun) === 'function';

function ensureDone(done) {
  if (!done) {
    throw new Error('Done is missing.');
  }

  if (!isFunction(done)) {
    throw new Error('Done is not a function.');
  }
}

function toBeThenable() {
  return {
    compare(actual) {
      const result = {};

      result.pass = (isFunction(actual.then));

      if (result.pass) {
        result.message = `Expected ${actual} not to be thenable (a Promise)`;
      } else {
        result.message = `Expected ${actual} to be thenable (a Promise)`;
      }

      return result;
    },
  };
}

function toResolve() {
  return {
    compare(promise, done) {
      function exit() { done(); }
      ensureDone(done);
      promise.then(exit, (error) => {
        done.fail(new NestedError('Promise was rejected', error));
      });

      return { pass: true };
    },
  };
}

function toResolveWith() {
  function failureMessage(actual, expected) {
    return `Expecting promise to be resolved with ("${toString(expected)}") `
           + `but was resolved with ("${toString(actual)}")`;
  }

  return {
    compare(promise, expected, done) {
      ensureDone(done);

      promise.then((actual) => {
        if (isEqual(actual, expected)) {
          return done();
        }
        return done.fail(failureMessage(actual, expected));
      }, (error) => {
        done.fail(new NestedError('Promise was rejected', error));
      }).catch(done.fail);

      return { pass: true };
    },
  };
}

function toReject() {
  return {
    compare(promise, done) {
      function exit() { done(); }
      const error = new Error('Promise was resolved');
      ensureDone(done);
      promise.then(() => {
        done.fail(error);
      }, exit);

      return { pass: true };
    },
  };
}

function toRejectWith() {
  function failureMessage(actual, expected) {
    return `Expecting promise to be rejected with ("${toString(expected)}") `
           + `but was rejected with ("${toString(actual)}")`;
  }

  return {
    compare(promise, expected, done) {
      const error = new Error('Promise was resolved');
      ensureDone(done);
      promise.then(() => {
        done.fail(error);
      }, (actual) => {
        if (isEqual(actual, expected)) {
          return done();
        }
        return done.fail(failureMessage(actual, expected));
      }).catch(done.fail);

      return { pass: true };
    },
  };
}

module.exports = {
  toBeThenable,
  toResolve,
  toResolveWith,
  toReject,
  toRejectWith,
};
