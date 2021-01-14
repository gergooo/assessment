require('chai').should();

const { getNumberPhrase } = require('./number-to-phrase');

describe('Number to phrase - unit tests', function () {
  it('3', function () {
    getNumberPhrase(3).should.equal('three');
  });
});
