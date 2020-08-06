/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = [];

export const checkFormSubmit = (e, e2) => {
  const eVal = e.value.trim();

  if (e.name === 'email') {
    if (eVal === '') {
      formError(e, 'Please provide an email');
      formStatus.push(0);
    } else if (!regexForm(e)) {
      formError(e, 'Please provide a valid email address');
      formStatus.push(0);
    } else {
      formSuccess(e, 'Woohoo!');
      formStatus.push(1);
    }
  }

  if (e.name === 'password') {
    if (eVal === '') {
      formError(e, 'Please provide a password');
      formStatus.push(0);
    } else if (!regexForm(e)) {
      formError(
        e,
        'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
      );
      formStatus.push(0);
    } else {
      formSuccess(e, 'Woohoo!');
      formStatus.push(1);
    }
  }

  if (e2 !== undefined && e2.name === 'password-confirm') {
    console.log(e2);
    if (e2.value === '') {
      formError(e2, 'Please enter your password to confirm');
      formStatus.push(0);
    } else if (e2.value.trim() !== eVal && e2.value !== '') {
      formError(e2, 'Please make sure your passwords match');
      formStatus.push(0);
    } else {
      formSuccess(e2, 'Woohoo!');
      formStatus.push(1);
    }
  }
};

function regexForm(e) {
  var regexResult = true;
  // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
  const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (e.name === 'password') {
    regexResult = regexPass.test(e.value);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(e.value);
  }

  return regexResult;
}
