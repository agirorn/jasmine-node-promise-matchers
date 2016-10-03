var toString = require('../lib/to-string');

describe('toString(object)', function() {
  it('returns jasmine.any(Number) as <jasmine.any(Number)>', function() {
    expect(toString(jasmine.any(Number))).toEqual('<jasmine.any(Number)>');
  });

  it('returns 10 as string', function() {
    expect(toString(10)).toEqual('10');
  });

  it('returns undefined as string', function() {
    expect(toString(undefined)).toEqual('undefined');
  });

  it('returns null as string', function() {
    expect(toString(null)).toEqual('null');
  });

});
