/*
 * jasmine-node-promise-matchers
 * https://github.com/agirorn/jasmine-node-promise-matchers
 *
 * Copyright (c) 2016 Ægir Örn Símonarson
 * Licensed under the ISC license.
 */

var NestedError = require('nested-error-stacks');
var toString = require('./to-string');
var isEqual = require('./is-equal');

module.exports = {
  toBeThenable: toBeThenable,
  toResolve: toResolve,
  toResolveWith: toResolveWith,
  toReject: toReject,
  toRejectWith: toRejectWith
};

function toBeThenable() {
  return {
    compare: function(actual) {
      var result = {};

      result.pass = (isFunction(actual.then));

      if (result.pass) {
        result.message = 'Expected ' + actual + ' not to be thenable (a Promise)';
      } else {
        result.message = 'Expected ' + actual + ' to be thenable (a Promise)';
      }

      return result;
    }
  };
}

function toResolve() {
  return {
    compare: function(promise, done) {
      ensureDone(done);
      promise.then(done, function(error) {
        done.fail(new NestedError('Promise was rejected', error));
      });

      return { pass: true };
    }
  };
}

function toResolveWith() {
  return {
    compare: function(promise, expected, done) {
      ensureDone(done);

      promise.then(function(actual) {
        if (isEqual(actual, expected)) {
          return done();
        }
        done.fail(failureMessage(actual, expected));
      }, function(error) {
        done.fail(new NestedError('Promise was rejected', error));
      }).catch(done.fail);

      return { pass: true };
    }
  };

  function failureMessage(actual, expected) {
    return 'Expecting promise to be resolved with ("' +toString(expected)+ '") '+
           'but was resolved with ("' +toString(actual)+ '")';
  }
}

function toReject() {
  return {
    compare: function(promise, done) {
      var error = new Error('Promise was resolved');
      ensureDone(done);
      promise.then(function() {
        done.fail(error);
      }, done);

      return { pass: true };
    }
  };
}

function toRejectWith() {
  return {
    compare: function(promise, expected, done) {
      var error = new Error('Promise was resolved');
      ensureDone(done);
      promise.then(function() {
          done.fail(error);
        }, function(actual) {
        if (isEqual(actual, expected)) {
          return done();
        }
        done.fail(failureMessage(actual, expected));
      }).catch(done.fail);

      return { pass: true };
    }
  };

  function failureMessage(actual, expected) {
    return 'Expecting promise to be rejected with ("' +toString(expected)+ '") '+
           'but was rejected with ("' +toString(actual)+ '")';
  }
}

function isFunction(fun) {
  return typeof(fun) === 'function';
}

function ensureDone(done) {
  if (!done) {
    throw new Error('Done is missing.');
  }

  if (!isFunction(done)) {
    throw new Error('Done is not a function.');
  }
}
