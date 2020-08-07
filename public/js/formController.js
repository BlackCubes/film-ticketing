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
      } else if (inputVal.length < 2) {
        formError(input, 'Please enter your name a minimum of 2 characters');
      } else if (inputVal.length > 70) {
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

    if (input.name === 'username') {
      if (inputVal === '') {
        formError(input, 'Please provide a username');
      } else if (inputVal.length < 3) {
        formError(input, 'Please enter a username a minimum of 3 characters');
      } else if (inputVal.length > 9) {
        formError(
          input,
          'Please enter a username that is 9 characters or less'
        );
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthmonth') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth month');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid month');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthday') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth day');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid day');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthyear') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth year');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid year');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-gender') {
      if (inputVal === '') {
        formError(input, 'Please provide a gender/non-gender');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid gender/non-gender');
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
  const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
  const regexDateMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const regexDateDay = [...Array(32).keys()].splice(1);
  const now = new Date().getFullYear();
  const regexDateYear = Array(now - (now - 101))
    .fill('')
    .map((val, i) => now - i);
  const regexGender = ['f', 'm', 'p'];

  if (e.name === 'password') {
    regexResult = regexPass.test(e.value);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(e.value);
  } else if (e.name === 'name') {
    regexResult = regexName.test(e.value);
  } else if (e.name === 'username') {
    regexResult = regexUsername.test(e.value);
  } else if (e.name === 'select-birthmonth') {
    regexResult = regexDateMonth.includes(e.value);
  } else if (e.name === 'select-birthday') {
    regexResult = regexDateDay.includes(parseInt(e.value));
  } else if (e.name === 'select-birthyear') {
    regexResult = regexDateYear.includes(parseInt(e.value));
  } else if (e.name === 'select-gender') {
    regexResult = regexGender.includes(e.value);
  }

  return regexResult;
}
