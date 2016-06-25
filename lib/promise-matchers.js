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
      var error = new Error('Promise was rejected');
      ensureDone(done);
      promise.then(done).catch(function() {
        done.fail(error);
      });

      return { pass: true };
    }
  };
}

function toResolveWith() {
  return {
    compare: function(promise, expected, done) {
      var error = new Error('Promise was rejected');
      ensureDone(done);

      promise.then(function(actual) {
        if (isEqual(actual, expected)) {
          return done();
        }
        done.fail(failurMessage(actual, expected));
      }).catch(function() {
        done.fail(error);
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
      var error = new Error('Promise was resolved');
      ensureDone(done);
      promise.then(function() {
        done.fail(error);
      }).catch(done);

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
        }).catch(function(actual) {
        if (isEqual(actual, expected)) {
          return done();
        }
        done.fail(failurMessage(actual, expected));
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

function isEqual(actual, expected) {
  var equal = require('deep-equal');
  if (actual.asymmetricMatch) {
    return actual.asymmetricMatch(expected);
  }
  if (expected.asymmetricMatch) {
    return expected.asymmetricMatch(actual);
  }
  return equal(actual, expected);
}

function ensureDone(done) {
  if (!done) {
    throw new Error('Done is missing.');
  }

  if (!isFunction(done)) {
    throw new Error('Done is not a function.');
  }
}
