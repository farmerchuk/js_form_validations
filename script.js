var form = document.querySelector('form');
var formSubmitError = document.querySelector('.submit-error-message');
var inputs = document.getElementsByTagName('input');
var firstNameInput = document.getElementById('first-name');
var lastNameInput = document.getElementById('last-name');
var creditCard = document.getElementById('credit-card');

firstNameInput.addEventListener('keypress', preventNonAlpha);
lastNameInput.addEventListener('keypress', preventNonAlpha);
creditCard.addEventListener('keypress', preventNonNumeric);
creditCard.addEventListener('keyup', moveFocusForward);
form.addEventListener('input', highlightErrors);
form.addEventListener('submit', highlightSubmitError);

function highlightErrors(event) {
  var input = event.target;

  if (input.validity.valid) {
    input.classList.remove('error');
    input.parentNode.lastElementChild.style.display = 'none';
    if (noErrors()) formSubmitError.style.display = 'none';
  } else {
    input.classList.add('error');
    input.parentNode.lastElementChild.style.display = 'block';
  }
}

function highlightAllErrors() {
  var inputsArray = Array.prototype.slice.call(inputs);

  inputsArray.forEach(function(input) {
    if (!input.validity.valid) {
      input.classList.add('error');
      input.parentNode.lastElementChild.style.display = 'block';
    }
  });
}

function highlightSubmitError(event) {
  event.preventDefault();

  if (!noErrors()) {
    highlightAllErrors();
    formSubmitError.style.display = 'block';
  }
}

function noErrors() {
  var inputsArray = Array.prototype.slice.call(inputs);

  return inputsArray.every(input => input.validity.valid);
}

function preventNonAlpha(event) {
  var key = String.fromCharCode(event.which);
  if (key.match(/[^a-zA-Z\s]+/)) event.preventDefault();
}

function preventNonNumeric(event) {
  var key = String.fromCharCode(event.which);

  if (event.target.name === 'credit-card' && key.match(/[^0-9]+/)) {
    event.preventDefault();
  }
}

function moveFocusForward(event) {
  var segment = event.target;
  var nextSegment = segment.nextElementSibling.nextElementSibling;

  if (segment.value.length === 4) nextSegment.focus();
}
