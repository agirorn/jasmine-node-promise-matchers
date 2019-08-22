const toString = require('../lib/to-string');

describe('toString(object)', () => {
  it('returns jasmine.any(Number) as <jasmine.any(Number)>', () => {
    expect(toString(jasmine.any(Number))).toEqual('<jasmine.any(Number)>');
  });

  it('returns 10 as string', () => {
    expect(toString(10)).toEqual('10');
  });

  it('returns undefined as string', () => {
    expect(toString(undefined)).toEqual('undefined');
  });

  it('returns null as string', () => {
    expect(toString(null)).toEqual('null');
  });
});
