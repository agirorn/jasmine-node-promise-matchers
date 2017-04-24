var subject = require('../lib/is-equal');

describe('isEqual', function() {
  describe('two equal errors', function() {
    it('should be equal', function() {
      expect(subject(new Error('a'), new Error('a'))).toBeTruthy();
    });
  });

  describe('two errors with different massages', function() {
    it('should be equal', function() {
      expect(subject(new Error('a'), new Error('b'))).toBeFalsy();
    });
  });

  describe('two errors with the same message but stil diffrent', function() {
    it('should be equal', function() {
      var a = new Error('a');
      var b = new Error('a');
      b.code = 10;
      expect(subject(a, b)).toBeFalsy();
    });
  });
});
