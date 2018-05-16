var form = document.querySelector('form');
var formSubmitError = document.querySelector('.submit-error-message');
var inputs = document.getElementsByTagName('input');

form.addEventListener('input', function(e) {
  var input = e.target;

  if (input.validity.valid) {
    input.classList.remove('error');
    input.nextElementSibling.style.display = 'none';
    if (noErrors()) formSubmitError.style.display = 'none';
  } else {
    input.classList.add('error');
    input.nextElementSibling.style.display = 'block';
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (!noErrors()) {
    highlightAllErrors();
    formSubmitError.style.display = 'block';
  }
});

function noErrors() {
  var inputsArray = Array.prototype.slice.call(inputs);

  return inputsArray.every(input => input.validity.valid);
}

function highlightAllErrors() {
  var inputsArray = Array.prototype.slice.call(inputs);

  inputsArray.forEach(function(input) {
    if (!input.validity.valid) {
      input.classList.add('error');
      input.nextElementSibling.style.display = 'block';
    }
  });
}
