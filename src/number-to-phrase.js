module.exports = { getNumberPhrase };

const digits = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

const numbersFrom11to19 = {
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
};

const tenMultiples = {
  1: 'ten',
  2: 'twenty',
  3: 'thirty',
  4: 'forty',
  5: 'fifty',
  6: 'sixty',
  7: 'seventy',
  8: 'eighty',
  9: 'ninety',
};

function getNumberPhrase(number) {
  let numberPhrase;

  if (number === 0) {
    numberPhrase = 'zero';
  } else if (number > 1000 && number < 2000) {
    numberPhrase = convertYearsBefore2000(number);
  } else {
    numberPhrase = convertGeneralNumbers(number);
  }

  return numberPhrase;
}

function convertYearsBefore2000(number) {
  const hundredsAndThousandsDigits = (number - (number % 100)) / 100;

  const hundredsAndThousands =
    convertTensAndOnes(hundredsAndThousandsDigits) + ' hundred';
  const onesAndTens = convertTensAndOnes(number);

  return combineStrings(hundredsAndThousands, ' and ', onesAndTens);
}

function convertGeneralNumbers(number) {
  const groupOfThousandsDigits = (number - (number % 1000)) / 1000;
  const belowMillion =
    number > 999 && convertThousandsGroup(groupOfThousandsDigits) + ' thousand';

  const belowThousand = convertThousandsGroup(number % 1000);

  return combineStrings(belowMillion, ', ', belowThousand);
}

function convertThousandsGroup(number) {
  const hundreds = convertHundreds(number);
  const onesAndTens = convertTensAndOnes(number);

  return combineStrings(hundreds, ' and ', onesAndTens);
}

function convertHundreds(number) {
  const hundredsDigit = (number - (number % 100)) / 100;
  return hundredsDigit !== 0 ? `${digits[hundredsDigit]} hundred` : '';
}

function convertTensAndOnes(number) {
  const onesAndTens = number % 100;

  let tensString;

  if (onesAndTens > 10 && onesAndTens < 20) {
    tensString = numbersFrom11to19[onesAndTens];
  } else if (onesAndTens) {
    const ones = onesAndTens % 10;
    const tens = onesAndTens >= 10 ? (onesAndTens - ones) / 10 : 0;

    tensString = combineStrings(tenMultiples[tens], '-', digits[ones]);
  }

  return tensString;
}

function combineStrings(first, combinator, second) {
  let result;

  if (first && second) {
    result = first + combinator + second;
  } else if (first) {
    result = first;
  } else {
    result = second;
  }

  return result;
}
