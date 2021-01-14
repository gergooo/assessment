'use strict';

const inputElement = document.getElementById('input');
const outputElement = document.getElementsByClassName('output')[0];
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const errorMessage = 'Please enter a valid integer.';
  const number = parseInt(inputElement.value);

  if (isNaN(number) || !inputElement.value.match(/^-?\d+$/)) {
    outputElement.textContent = errorMessage;
  } else if (Math.abs(number) > 999999999999999) {
    outputElement.textContent =
      'Please enter an integer ' +
      (number > 0 ? 'smaller' : 'larger') +
      ' than ' +
      (number > 0 ? '' : '-') +
      '999,999,999,999,999.';
  } else {
    outputElement.textContent = getNumberPhrase(number) || errorMessage;
  }

  outputElement.classList.add('changed');
  setTimeout(() => outputElement.classList.remove('changed'), 50);
});
