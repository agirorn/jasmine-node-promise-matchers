var subject = require('../lib/is-equal');

describe('isEqual', function() {
  describe('Objects', function() {
    it('should be equal', function() {
      expect(subject({ key: 'value' }, { key: 'value' })).toBeTruthy();
    });

    it('should not be equal', function() {
      expect(subject({ key: 'value' }, { key: 'no-value' })).toBeFalsy();
    });
  });

  describe('errors', function() {
    describe('two errors', function() {
      describe('when .message is the same', function() {
        it('should be equal', function() {
          expect(subject(new Error(''), new Error(''))).toBeTruthy();
        });
      });

      describe('when .message is not the same', function() {
        it('should not be equal', function() {
          expect(subject(new Error(''), new Error('x'))).toBeFalsy();
        });
      });

      describe('when .message is the same expected is diffrent', function() {
        it('should not be equal', function() {
          var actual = new Error('');
          var expected = new Error('');
          expected.code = 1;
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });

    describe('expected is an asymmetric matcher', function() {
      describe('match', function() {
        it('should be equal', function() {
          var expected = { asymmetricMatch: function() { return true; } };
          var actual = new Error('');
          expect(subject(actual, expected)).toBeTruthy();
        });
      });

      describe('diffrent', function() {
        it('should not be equal', function() {
          var expected = { asymmetricMatch: function() { return false; } };
          var actual = new Error('');
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });

    describe('actual is an asymmetric matcher', function() {
      describe('match', function() {
        it('should be equal', function() {
          var actual = { asymmetricMatch: function() { return true; } };
          var expected = new Error('');
          expect(subject(actual, expected)).toBeTruthy();
        });
      });

      describe('diffrent', function() {
        it('should not be equal', function() {
          var actual = { asymmetricMatch: function() { return false; } };
          var expected = new Error('');
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });
  });
});
