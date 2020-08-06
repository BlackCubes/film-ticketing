/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = true;

export const checkForm = e => {
  const eVal = e.value.trim();

  if (e.name === 'email') {
    if (eVal === '') {
      formError(e, 'Please provide an email');
      formStatus = false;
    } else if (!regexForm(e)) {
      formError(e, 'Please provide a valid email address');
      formStatus = false;
    } else {
      formSuccess(e, 'Woohoo!');
      formStatus = true;
    }
  }

  if (e.name === 'password') {
    if (eVal === '') {
      formError(e, 'Please provide a password');
      formStatus = false;
    } else if (!regexForm(e)) {
      formError(
        e,
        'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
      );
      formStatus = false;
    } else {
      formSuccess(e, 'Woohoo!');
      formStatus = true;
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
