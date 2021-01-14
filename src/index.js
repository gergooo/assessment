const inputElement = document.getElementById('input');
const outputElement = document.getElementsByClassName('output')[0];
const submitButton = document.getElementById('submit');
const errorMessage = 'Please enter an integer.';

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const input = parseInt(inputElement.value);

  if (isNaN(input) || !inputElement.value.match(/^-?\d+$/)) {
    outputElement.textContent = errorMessage;
  } else {
    outputElement.textContent = getNumberPhrase(input) || errorMessage;
  }

  outputElement.classList.add('changed');
  setTimeout(() => outputElement.classList.remove('changed'), 50);
});
