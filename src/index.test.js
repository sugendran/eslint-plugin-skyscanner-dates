const getHostname = require('./index');

describe('getHostname', () => {
  it('should return correct HOST when URL is valid', () => {
    const actual = getHostname('https://github.skyscannertools.net/groups/mshell-node');
    const expected = 'github.skyscannertools.net';
    expect(actual).toBe(expected);
  });
});
