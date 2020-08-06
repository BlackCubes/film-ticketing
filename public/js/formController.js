/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
  formStatus = 0;

  inputs.forEach(input => {
    var inputVal = input.value.trim();

    if (input.name === 'email') {
      if (inputVal === '') {
        formError(input, 'Please provide an email');
      } else if (!regexForm(input)) {
        formError(input, 'Please provide a valid email address');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password') {
      if (inputVal === '') {
        formError(input, 'Please provide a password');
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password-confirm') {
      if (inputVal === '') {
        formError(input, 'Please enter your password to confirm');
      } else if (
        inputVal !== inputs.find(i => i.name === 'password').value.trim() &&
        inputVal !== ''
      ) {
        formError(input, 'Please make sure your passwords match');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'name') {
      if (inputVal === '') {
        formError(input, 'Please provide your name');
      } else if (inputVal < 2) {
        formError(input, 'Please enter your name a minimum of 2 characters');
      } else if (inputVal > 70) {
        formError(
          input,
          'Please enter your name that is 70 characters or less'
        );
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }
  });
};

function regexForm(e) {
  var regexResult = true;
  // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
  const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;

  if (e.name === 'password') {
    regexResult = regexPass.test(e.value);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(e.value);
  } else if (e.name === 'name') {
    regexResult = regexName.test(e.value);
  }

  return regexResult;
}
