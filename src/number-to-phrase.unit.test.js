require('chai').should();

const { getNumberPhrase } = require('./number-to-phrase');

describe('Number to phrase - unit tests', function () {
  it('numbers below ten', function () {
    getNumberPhrase(0).should.equal('zero');
    getNumberPhrase(1).should.equal('one');
    getNumberPhrase(2).should.equal('two');
    getNumberPhrase(3).should.equal('three');
    getNumberPhrase(4).should.equal('four');
    getNumberPhrase(5).should.equal('five');
    getNumberPhrase(6).should.equal('six');
    getNumberPhrase(7).should.equal('seven');
    getNumberPhrase(8).should.equal('eight');
    getNumberPhrase(9).should.equal('nine');
  });

  it('numbers below twenty', function () {
    getNumberPhrase(10).should.equal('ten');
    getNumberPhrase(11).should.equal('eleven');
    getNumberPhrase(12).should.equal('twelve');
    getNumberPhrase(13).should.equal('thirteen');
    getNumberPhrase(14).should.equal('fourteen');
    getNumberPhrase(15).should.equal('fifteen');
    getNumberPhrase(16).should.equal('sixteen');
    getNumberPhrase(17).should.equal('seventeen');
    getNumberPhrase(18).should.equal('eighteen');
    getNumberPhrase(19).should.equal('nineteen');
  });

  context('numbers from 20 to 100', function () {
    it('multiples of 10', function () {
      getNumberPhrase(20).should.equal('twenty');
      getNumberPhrase(30).should.equal('thirty');
      getNumberPhrase(40).should.equal('forty');
      getNumberPhrase(50).should.equal('fifty');
      getNumberPhrase(60).should.equal('sixty');
      getNumberPhrase(70).should.equal('seventy');
      getNumberPhrase(80).should.equal('eighty');
      getNumberPhrase(90).should.equal('ninety');
    });

    it('twenties and above', function () {
      getNumberPhrase(21).should.equal('twenty-one');
      getNumberPhrase(23).should.equal('twenty-three');
      getNumberPhrase(35).should.equal('thirty-five');
      getNumberPhrase(59).should.equal('fifty-nine');
      getNumberPhrase(64).should.equal('sixty-four');
      getNumberPhrase(98).should.equal('ninety-eight');
    });
  });
});
