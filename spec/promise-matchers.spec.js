describe('PromiseMatchers', function() {

  beforeEach(function() {
    jasmine.addMatchers(require('../'));
  });

  describe('.toResolve', function() {
    it('succseeds on a resolving promise', function(done) {
      var promise = new Promise(function(resolve) {
        resolve();
      });

      expect(promise).toResolve(done);
    });

    it('fails on a rejected promise', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject();
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual('Promise was rejected');
        done();
      });

      expect(promise).toResolve(done);
    });
  });

  describe('.toResolveWith', function() {
    it('succseeds when promise resolves with same value', function(done) {
      var promise = new Promise(function(resolve) {
        resolve('Value');
      });

      expect(promise).toResolveWith('Value', done);
    });

    it('succseeds when promise resolves with nested object', function(done) {
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
      var promise = new Promise(function(resolve, reject) {
        reject();
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual('Promise was rejected');
        done();
      });

      expect(promise).toResolveWith('value', done);
    });
  });

  describe('.toReject', function() {
    it('succseeds on a rejected promise', function(done) {
      var promise = new Promise(function(resolve, rejected) {
        rejected();
      });

      expect(promise).toReject(done);
    });

    it('fails on a resolved promise', function(done) {
      var promise = new Promise(function(resolve) {
        resolve();
      });

      spyOn(done, 'fail').and.callFake(function(message) {
        expect(message).toEqual('Promise was resolved');
        done();
      });

      expect(promise).toReject(done);
    });
  });

  describe('.toRejectWith', function() {

    it('succseeds when promise is rejected with same value', function(done) {
      var promise = new Promise(function(resolve, reject) {
        reject('Value');
      });

      expect(promise).toRejectWith('Value', done);
    });

    it('succseeds when promise is rejected with same value', function(done) {
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
        expect(message).toEqual('Promise was resolved');
        done();
      });

      expect(promise).toRejectWith('value', done);
    });
  });

});
