const NestedError = require('nested-error-stacks');
const promiseMatchers = require('../');

describe('PromiseMatchers', () => {
  beforeEach(() => {
    jasmine.addMatchers(promiseMatchers);
  });

  describe('.toBeThenable', () => {
    it('succeeds if it has .then', () => {
      const thenable = {
        then() {},
      };

      expect(thenable).toBeThenable();
    });

    it('succeeds if it is a Promise', () => {
      const promise = Promise.resolve();
      expect(promise).toBeThenable();
    });

    it('fails if it does not have .then', () => {
      const object = {
        catch() {},
      };

      expect(object).not.toBeThenable();
    });
  });

  describe('.toResolve', () => {
    it('succeeds on a resolving promise', (done) => {
      const promise = new Promise(((resolve) => {
        resolve();
      }));

      expect(promise).toResolve(done);
    });

    it('succeeds on a resolving promise with an Error', (done) => {
      const promise = new Promise(((resolve) => {
        resolve(new Error());
      }));

      expect(promise).toResolve(done);
    });

    it('fails on a rejected promise', (done) => {
      const nestedError = new Error('my nested error');
      const promise = new Promise(((resolve, reject) => {
        reject(nestedError);
      }));

      spyOn(done, 'fail').and.callFake((error) => {
        expect(error instanceof NestedError).toBe(true);
        expect(error.nested).toBe(nestedError);
        expect(error.message).toBe('Promise was rejected');
        done();
      });

      expect(promise).toResolve(done);
    });

    it('throws an error if done is missing', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toResolve();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toResolve('string');
      }).toThrowError(/Done is not a function/);
    });
  });

  describe('.toResolveWith', () => {
    it('succeeds when promise resolves with same value', (done) => {
      const promise = new Promise(((resolve) => {
        resolve('Value');
      }));

      expect(promise).toResolveWith('Value', done);
    });

    it('succeeds when promise resolves with an Error value', (done) => {
      const promise = new Promise(((resolve) => {
        resolve(new Error());
      }));

      expect(promise).toResolveWith(new Error(), done);
    });

    it('succeeds when promise resolves with nested object', (done) => {
      const promise = new Promise(((resolve) => {
        resolve({
          key: {
            key: 'value',
          },
        });
      }));

      const value = {
        key: {
          key: 'value',
        },
      };

      expect(promise).toResolveWith(value, done);
    });


    it('fails when promise resolves with diferent value', (done) => {
      const promise = new Promise(((resolve) => {
        resolve('Wrong value');
      }));

      spyOn(done, 'fail').and.callFake((message) => {
        expect(message).toEqual(
          'Expecting promise to be resolved with ("value") '
          + 'but was resolved with ("Wrong value")',
        );
        done();
      });

      expect(promise).toResolveWith('value', done);
    });

    it('fails on a rejected promise', (done) => {
      const nestedError = new Error('my nested error');
      const promise = new Promise(((resolve, reject) => {
        reject(nestedError);
      }));

      spyOn(done, 'fail').and.callFake((error) => {
        expect(error instanceof NestedError).toBe(true);
        expect(error.nested).toBe(nestedError);
        expect(error.message).toBe('Promise was rejected');
        done();
      });

      expect(promise).toResolveWith('value', done);
    });

    it('throws an error if done is missing', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toResolveWith();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toResolveWith('string', 'string');
      }).toThrowError(/Done is not a function/);
    });

    it('matches actial asymmetricMatch', (done) => {
      const promise = new Promise(((resolve) => {
        resolve(jasmine.any(Object));
      }));

      expect(promise).toResolveWith({}, done);
    });

    it('matches expected asymmetricMatch', (done) => {
      const promise = new Promise(((resolve) => {
        resolve({});
      }));

      expect(promise).toResolveWith(jasmine.any(Object), done);
    });

    it('matches expected null', (done) => {
      const promise = new Promise(((resolve) => {
        resolve(null);
      }));

      expect(promise).toResolveWith(null, done);
    });

    it('matches expected undefined', (done) => {
      const promise = new Promise(((resolve) => {
        resolve(undefined);
      }));

      expect(promise).toResolveWith(undefined, done);
    });
  });

  describe('.toReject', () => {
    it('succeeds on a rejected promise', (done) => {
      const promise = new Promise(((resolve, rejected) => {
        rejected();
      }));

      expect(promise).toReject(done);
    });

    it('succeeds on a rejected promise with an Error', (done) => {
      const promise = new Promise(((resolve, rejected) => {
        rejected(new Error());
      }));

      expect(promise).toReject(done);
    });

    it('fails on a resolved promise', (done) => {
      const promise = new Promise(((resolve) => {
        resolve();
      }));

      spyOn(done, 'fail').and.callFake((message) => {
        expect(message).toEqual(new Error('Promise was resolved'));
        done();
      });

      expect(promise).toReject(done);
    });

    it('throws an error if done is missing', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toReject();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toReject('string');
      }).toThrowError(/Done is not a function/);
    });
  });

  describe('.toRejectWith', () => {
    it('succeeds when promise is rejected with same value', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Value');
      }));

      expect(promise).toRejectWith('Value', done);
    });

    it('succeeds when promise is rejected with an Error', (done) => {
      const promise = new Promise(((resolve, reject) => {
        reject(new Error());
      }));

      expect(promise).toRejectWith(new Error(), done);
    });

    it('succeeds when promise is rejected with same value', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ key: { key: 'value' } });
      }));

      const value = { key: { key: 'value' } };

      expect(promise).toRejectWith(value, done);
    });

    it('fails when promise rejects with different value', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Wrong value');
      }));

      spyOn(done, 'fail').and.callFake((message) => {
        expect(message).toEqual(
          'Expecting promise to be rejected with ("value") '
          + 'but was rejected with ("Wrong value")',
        );
        done();
      });

      expect(promise).toRejectWith('value', done);
    });

    it('fails on a resolved promise', (done) => {
      const promise = new Promise(((resolve) => {
        resolve();
      }));

      spyOn(done, 'fail').and.callFake((message) => {
        expect(message).toEqual(new Error('Promise was resolved'));
        done();
      });

      expect(promise).toRejectWith('value', done);
    });

    it('throws an error if done is missing', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toRejectWith();
      }).toThrowError(/Done is missing/);
    });

    it('throws an error if done is not a function', () => {
      const promise = new Promise((() => {}));

      expect(() => {
        expect(promise).toRejectWith('arg', 'string');
      }).toThrowError(/Done is not a function/);
    });

    it('matches actial asymmetricMatch', (done) => {
      const promise = new Promise(((resolve, reject) => {
        reject(jasmine.any(Object));
      }));

      expect(promise).toRejectWith({}, done);
    });

    it('matches expected asymmetricMatch', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({});
      }));

      expect(promise).toRejectWith(jasmine.any(Object), done);
    });

    it('matches expected null', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(null);
      }));

      expect(promise).toRejectWith(null, done);
    });

    it('matches expected undefined', (done) => {
      const promise = new Promise(((resolve, reject) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(undefined);
      }));

      expect(promise).toRejectWith(undefined, done);
    });
  });
});
