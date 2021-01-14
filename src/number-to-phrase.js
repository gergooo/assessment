const digitNames = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const numbersBetween10and20 = {
  10: 'ten',
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
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

function getNumberPhrase(number) {
  return (
    tenMultiples[number] ||
    numbersBetween10and20[number] ||
    digitNames[number] ||
    `${tenMultiples[number - (number % 10)]}-${digitNames[number % 10]}`
  );
}

module.exports = { getNumberPhrase };
