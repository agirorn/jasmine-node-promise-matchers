/*
 * jasmine-node-promise-matchers
 * https://github.com/agirorn/jasmine-node-promise-matchers
 *
 * Copyright (c) 2016 Ægir Örn Símonarson
 * Licensed under the ISC license.
 */
module.exports = {
  toResolve: toResolve,
  toResolveWith: toResolveWith,
  toReject: toReject,
  toRejectWith: toRejectWith
};

function toResolve() {
  return {
    compare: function(promise, done) {
      ensureDone(done);
      promise.then(done).catch(function() {
        done.fail('Promise was rejected');
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
        if (different(actual, expected)) {
          done.fail(failurMessage(actual, expected));
        }
        done();
      }).catch(function() {
        done.fail('Promise was rejected');
      });

      return { pass: true };
    }
  };

  function failurMessage(actual, expected) {
    return 'Expecting promise to be resolved with ("' +expected+ '") '+
           'but was resolved with ("' +actual+ '")';
  }
}

function toReject() {
  return {
    compare: function(promise, done) {
      ensureDone(done);
      promise.then(function() {
        done.fail('Promise was resolved');
      }).catch(done);

      return { pass: true };
    }
  };
}

function toRejectWith() {
  return {
    compare: function(promise, expected, done) {
      ensureDone(done);
      promise.then(function() {
          done.fail('Promise was resolved');
        }).catch(function(actual) {
        if (different(actual, expected)) {
          done.fail(failurMessage(actual, expected));
        }
        done();
      });
      return { pass: true };
    }
  };

  function failurMessage(actual, expected) {
    return 'Expecting promise to be rejected with ("' +expected+ '") '+
           'but was rejected with ("' +actual+ '")';
  }
}

function isFunction(done) {
  return typeof(done) === 'function';
}

function different(value1, value2) {
  var equal = require('deep-equal');
  return !equal(value1, value2);
}

function ensureDone(done) {
  if (!done) {
    throw new Error('Done is missing.');
  }

  if (!isFunction(done)) {
    throw new Error('Done is not a function.');
  }
}


