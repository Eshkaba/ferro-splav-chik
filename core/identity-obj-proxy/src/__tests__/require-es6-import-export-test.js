const idObj = require('../test-redirections/idObjES6ImportExport').default;

describe('idObj', () => {
  it('should return the key as a string', () => {
    expect(idObj.foo).toBe('foo');
  });
  it('should support dot notation', () => {
    expect(idObj.bar).toBe('bar');
  });
  it('should support bracket notation', () => {
    expect(idObj[1]).toBe('1');
  });
});
