const chai = require('chai');
const expect = chai.expect;
chai.should();

const { getNumberPhrase } = require('./number-to-phrase');

describe('Number to phrase - unit tests', function () {
  context('below 1000', function () {
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

    it('numbers from 11 to 19', function () {
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

    context('numbers from 20 to 99', function () {
      it('multiples of 10', function () {
        getNumberPhrase(10).should.equal('ten');
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

    context('numbers from 100 to 999', function () {
      it('multiples of 100', function () {
        getNumberPhrase(100).should.equal('one hundred');
        getNumberPhrase(300).should.equal('three hundred');
        getNumberPhrase(900).should.equal('nine hundred');
      });

      it('hundred somethings', function () {
        getNumberPhrase(101).should.equal('one hundred and one');
        getNumberPhrase(111).should.equal('one hundred and eleven');
        getNumberPhrase(236).should.equal('two hundred and thirty-six');
        getNumberPhrase(999).should.equal('nine hundred and ninety-nine');
      });
    });
  });

  context('from 1000 to 999,999', function () {
    it('thousands above 1000', function () {
      getNumberPhrase(1000).should.equal('one thousand');
      getNumberPhrase(2000).should.equal('two thousand');
      getNumberPhrase(7000).should.equal('seven thousand');
    });

    it('ten thousands', function () {
      getNumberPhrase(10000).should.equal('ten thousand');
      getNumberPhrase(40000).should.equal('forty thousand');
      getNumberPhrase(80000).should.equal('eighty thousand');

      getNumberPhrase(62000).should.equal('sixty-two thousand');
      getNumberPhrase(38000).should.equal('thirty-eight thousand');
    });

    it('hundred thousands', function () {
      getNumberPhrase(100000).should.equal('one hundred thousand');
      getNumberPhrase(687000).should.equal(
        'six hundred and eighty-seven thousand'
      );
    });

    it('combining with ones, tens, hundreds', function () {
      getNumberPhrase(2001).should.equal('two thousand one');
      getNumberPhrase(5678).should.equal(
        'five thousand six hundred and seventy-eight'
      );
      getNumberPhrase(666666).should.equal(
        'six hundred and sixty-six thousand six hundred and sixty-six'
      );
      getNumberPhrase(900013).should.equal('nine hundred thousand thirteen');
    });

    it('hundred thousands - from 1001 to 1999 British style', function () {
      getNumberPhrase(1001).should.equal('ten hundred and one');
      getNumberPhrase(1541).should.equal('fifteen hundred and forty-one');
      getNumberPhrase(1999).should.equal('nineteen hundred and ninety-nine');
    });
  });

  context('above million!', function () {
    it('millions', function () {
      getNumberPhrase(1000000).should.equal('one million');
      getNumberPhrase(123456789).should.equal(
        'one hundred and twenty-three million ' +
          'four hundred and fifty-six thousand ' +
          'seven hundred and eighty-nine'
      );
      getNumberPhrase(900000013).should.equal('nine hundred million thirteen');
    });

    it('billions', function () {
      getNumberPhrase(1000000000).should.equal('one billion');
      getNumberPhrase(330100023300).should.equal(
        'three hundred and thirty billion ' +
          'one hundred million ' +
          'twenty-three thousand ' +
          'three hundred'
      );
      getNumberPhrase(999999999999).should.equal(
        'nine hundred and ninety-nine billion ' +
          'nine hundred and ninety-nine million ' +
          'nine hundred and ninety-nine thousand ' +
          'nine hundred and ninety-nine'
      );
    });

    it('trillions', function () {
      getNumberPhrase(1000000000000).should.equal('one trillion');
      getNumberPhrase(330100023300602).should.equal(
        'three hundred and thirty trillion ' +
          'one hundred billion ' +
          'twenty-three million ' +
          'three hundred thousand ' +
          'six hundred and two'
      );
      getNumberPhrase(999999999999999).should.equal(
        'nine hundred and ninety-nine trillion ' +
          'nine hundred and ninety-nine billion ' +
          'nine hundred and ninety-nine million ' +
          'nine hundred and ninety-nine thousand ' +
          'nine hundred and ninety-nine'
      );
    });
  });

  it('too large input', function () {
    expect(getNumberPhrase(999999999999999 + 1)).to.be.null;
    expect(getNumberPhrase(999999999999999 + 6546)).to.be.null;
  });
});
