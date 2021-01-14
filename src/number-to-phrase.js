module.exports = { getNumberPhrase };

const DIGITS = {
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

const NUMBERS_FROM_11_TO_19 = {
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

const TEN_MULTIPLES = {
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

const THOUSANDS_GROUP_NAMES = [
  '',
  'thousand',
  'million',
  'billion',
  'trillion',
];

const ZERO = 'zero';
const HUNDRED = 'hundred';

const THOUSANDS_GROUP_SEPARATOR = ' ';
const HUNDREDS_AND_TENS_SEPARATOR = ' and ';
const TENS_AND_ONES_SEPARATOR = '-';
const MINUS = 'minus';

function getNumberPhrase(number) {
  const absoluteValue = Math.abs(number);
  let numberPhrase;

  if (absoluteValue > 999999999999999) {
    return null;
  } else if (absoluteValue === 0) {
    numberPhrase = ZERO;
  } else if (absoluteValue > 1000 && absoluteValue < 2000) {
    numberPhrase = convertYearsBefore2000(absoluteValue);
  } else {
    numberPhrase = convertGeneralNumbers(absoluteValue);
  }

  const negativePrefix = number < 0 ? MINUS + ' ' : '';

  return negativePrefix + numberPhrase;
}

function convertYearsBefore2000(number) {
  const thousandsAndHundredsDigits = Math.floor(number / 100);

  const thousandsAndHundreds =
    convertTensAndOnes(thousandsAndHundredsDigits) + ' ' + HUNDRED;
  const tensAndOnes = convertTensAndOnes(number);

  return combineStrings(
    thousandsAndHundreds,
    HUNDREDS_AND_TENS_SEPARATOR,
    tensAndOnes
  );
}

function convertGeneralNumbers(number) {
  let numberPhrase = '';
  let i = 0;

  do {
    const thousandsGroup = convertSmallestThousandsGroup(
      number,
      THOUSANDS_GROUP_NAMES[i]
    );

    numberPhrase = combineStrings(
      thousandsGroup,
      THOUSANDS_GROUP_SEPARATOR,
      numberPhrase
    );

    number = Math.floor(number / 1000);
    i++;
  } while (number);

  return numberPhrase;
}

function convertSmallestThousandsGroup(number, name) {
  let groupWithName = null;
  const lastThreeDigits = number % 1000;

  if (lastThreeDigits) {
    const hundreds = convertHundreds(lastThreeDigits);
    const onesAndTens = convertTensAndOnes(lastThreeDigits);

    const group = combineStrings(
      hundreds,
      HUNDREDS_AND_TENS_SEPARATOR,
      onesAndTens
    );
    groupWithName = combineStrings(group, ' ', name);
  }

  return groupWithName;
}

function convertHundreds(number) {
  const hundredsDigit = Math.floor(number / 100);

  return hundredsDigit !== 0 ? `${DIGITS[hundredsDigit]} ${HUNDRED}` : '';
}

function convertTensAndOnes(number) {
  const tensAndOnes = number % 100;

  let tensString;

  if (tensAndOnes > 10 && tensAndOnes < 20) {
    tensString = NUMBERS_FROM_11_TO_19[tensAndOnes];
  } else if (tensAndOnes) {
    const tens = Math.floor(tensAndOnes / 10);
    const ones = tensAndOnes % 10;

    tensString = combineStrings(
      TEN_MULTIPLES[tens],
      TENS_AND_ONES_SEPARATOR,
      DIGITS[ones]
    );
  }

  return tensString;
}

function combineStrings(first, combinator = '', second = '') {
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
