const subject = require('../lib/is-equal');

describe('isEqual', () => {
  describe('Objects', () => {
    it('should be equal', () => {
      expect(subject({ key: 'value' }, { key: 'value' })).toBeTruthy();
    });

    it('should not be equal', () => {
      expect(subject({ key: 'value' }, { key: 'no-value' })).toBeFalsy();
    });
  });

  describe('errors', () => {
    describe('two errors', () => {
      describe('when .message is the same', () => {
        it('should be equal', () => {
          expect(subject(new Error(''), new Error(''))).toBeTruthy();
        });
      });

      describe('when .message is not the same', () => {
        it('should not be equal', () => {
          expect(subject(new Error(''), new Error('x'))).toBeFalsy();
        });
      });

      describe('when .message is the same expected is diffrent', () => {
        it('should not be equal', () => {
          const actual = new Error('');
          const expected = new Error('');
          expected.code = 1;
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });

    describe('expected is an asymmetric matcher', () => {
      describe('match', () => {
        it('should be equal', () => {
          const expected = { asymmetricMatch() { return true; } };
          const actual = new Error('');
          expect(subject(actual, expected)).toBeTruthy();
        });
      });

      describe('diffrent', () => {
        it('should not be equal', () => {
          const expected = { asymmetricMatch() { return false; } };
          const actual = new Error('');
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });

    describe('actual is an asymmetric matcher', () => {
      describe('match', () => {
        it('should be equal', () => {
          const actual = { asymmetricMatch() { return true; } };
          const expected = new Error('');
          expect(subject(actual, expected)).toBeTruthy();
        });
      });

      describe('diffrent', () => {
        it('should not be equal', () => {
          const actual = { asymmetricMatch() { return false; } };
          const expected = new Error('');
          expect(subject(actual, expected)).toBeFalsy();
        });
      });
    });
  });
});
