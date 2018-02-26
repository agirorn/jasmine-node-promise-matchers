var NestedError = require('nested-error-stacks');

describe('PromiseMatchers', function() {

  beforeEach(function() {
    jasmine.addMatchers(require('../'));
  });

  describe('.toBeThenable', function() {
    it('succeeds if it has .then', function() {
      var thenable = {
        then: function () {}
      };

      expect(thenable).toBeThenable();
    });

    it('succeeds if it is a Promise', function() {
      var promise = Promise.resolve();
      expect(promise).toBeThenable();
    });

    it('fails if it does not have .then', function() {
      var object = {
        catch: function () {}
      };

      expect(object).not.toBeThenable();
    });
  });

  describe('.toResolve', function() {
    it('succeeds on a resolving promise', function(done) {
      var promise = new Promise(function(resolve) {
        resolve();
      });

      expect(promise).toResolve(done);
    });

    it('succeeds on a resolving promise with an Error', function(done) {
      var promise = new Promise(function(resolve) {
        resolve(new Error());
      });

      expect(promise).toResolve(done);
    });

    it('fails on a rejected promise', function(done) {
      var nestedError = new Error('my nested error');
      var promise = new Promise(function(resolve, reject) {
        reject(nestedError);
      });

      spyOn(done, 'fail').and.callFake(function(error) {
        expect(error instanceof NestedError).toBe(true);
        expect(error.nested).toBe(nestedError);
        expect(error.message).toBe('Promise was rejected');
        done();
      });

      expect(promise).toResolve(done);
    });

    it('throws an error if done is missing', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toResolve();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toResolve('string');
      }).toThrowError(/Done is not a function/);
    });
  });

  describe('.toResolveWith', function() {
    it('succeeds when promise resolves with same value', function(done) {
      var promise = new Promise(function(resolve) {
        resolve('Value');
      });

      expect(promise).toResolveWith('Value', done);
    });

    it('succeeds when promise resolves with an Error value', function(done) {
      var promise = new Promise(function(resolve) {
        resolve(new Error());
      });

      expect(promise).toResolveWith(new Error(), done);
    });

    it('succeeds when promise resolves with nested object', function(done) {
      var promise = new Promise(function(resolve) {
        resolve({
          key: {
            key: 'value'
          }
        });
      });

      var value = {
        key: {
          key: 'value'
        }
      };

      expect(promise).toResolveWith(value, done);
    });


    it('fails when promise resolves with diferent value', function(done) {
      var promise = new Promise(function(resolve) {
        resolve('Wrong value');
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual(
          'Expecting promise to be resolved with ("value") '+
          'but was resolved with ("Wrong value")'
        );
        done();
      });

      expect(promise).toResolveWith('value', done);
    });

    it('fails on a rejected promise', function(done) {
      var nestedError = new Error('my nested error');
      var promise = new Promise(function(resolve, reject) {
        reject(nestedError);
      });

      spyOn(done, 'fail').and.callFake(function(error) {
        expect(error instanceof NestedError).toBe(true);
        expect(error.nested).toBe(nestedError);
        expect(error.message).toBe('Promise was rejected');
        done();
      });

      expect(promise).toResolveWith('value', done);
    });

    it('throws an error if done is missing', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toResolveWith();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toResolveWith('string', 'string');
      }).toThrowError(/Done is not a function/);
    });

    it('matches actial asymmetricMatch', function(done) {
      var promise = new Promise(function(resolve) {
        resolve(jasmine.any(Object));
      });

      expect(promise).toResolveWith({}, done);
    });

    it('matches expected asymmetricMatch', function(done) {
      var promise = new Promise(function(resolve) {
        resolve({});
      });

      expect(promise).toResolveWith(jasmine.any(Object), done);
    });

    it('matches expected null', function(done) {
      var promise = new Promise(function(resolve) {
        resolve(null);
      });

      expect(promise).toResolveWith(null, done);
    });

    it('matches expected undefined', function(done) {
      var promise = new Promise(function(resolve) {
        resolve(undefined);
      });

      expect(promise).toResolveWith(undefined, done);
    });
  });

  describe('.toReject', function() {
    it('succeeds on a rejected promise', function(done) {
      var promise = new Promise(function(resolve, rejected) {
        rejected();
      });

      expect(promise).toReject(done);
    });

    it('succeeds on a rejected promise with an Error', function(done) {
      var promise = new Promise(function(resolve, rejected) {
        rejected(new Error());
      });

      expect(promise).toReject(done);
    });

    it('fails on a resolved promise', function(done) {
      var promise = new Promise(function(resolve) {
        resolve();
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual(new Error('Promise was resolved'));
        done();
      });

      expect(promise).toReject(done);
    });

    it('throws an error if done is missing', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toReject();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toReject('string');
      }).toThrowError(/Done is not a function/);
    });
  });

  describe('.toRejectWith', function() {
    it('succeeds when promise is rejected with same value', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject('Value');
      });

      expect(promise).toRejectWith('Value', done);
    });

    it('succeeds when promise is rejected with an Error', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject(new Error());
      });

      expect(promise).toRejectWith(new Error(), done);
    });

    it('succeeds when promise is rejected with same value', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject({ key: { key: 'value' } });
      });

      var value = { key: { key: 'value' } };

      expect(promise).toRejectWith(value, done);
    });

    it('fails when promise rejects with different value', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject('Wrong value');
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual(
          'Expecting promise to be rejected with ("value") '+
          'but was rejected with ("Wrong value")'
        );
        done();
      });

      expect(promise).toRejectWith('value', done);
    });

    it('fails on a resolved promise', function(done) {
      var promise = new Promise(function(resolve) {
        resolve();
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual(new Error('Promise was resolved'));
        done();
      });

      expect(promise).toRejectWith('value', done);
    });

    it('throws an error if done is missing', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toRejectWith();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', function() {
      var promise = new Promise(function() {});

      expect(function() {
        expect(promise).toRejectWith('arg', 'string');
      }).toThrowError(/Done is not a function/);
    });

    it('matches actial asymmetricMatch', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject(jasmine.any(Object));
      });

      expect(promise).toRejectWith({}, done);
    });

    it('matches expected asymmetricMatch', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject({});
      });

      expect(promise).toRejectWith(jasmine.any(Object), done);
    });

    it('matches expected null', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject(null);
      });

      expect(promise).toRejectWith(null, done);
    });

    it('matches expected undefined', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject(undefined);
      });

      expect(promise).toRejectWith(undefined, done);
    });
  });
});
