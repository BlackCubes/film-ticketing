/* eslint-disable */
import { formError, formSuccess } from './errorController';

export const checkForm = e => {
  const eVal = e.value.trim();

  if (e.name === 'email') {
    if (eVal === '') {
      formError(e, 'Please provide an email');
    } else {
      formSuccess(e, 'Woohoo!');
    }
  }

  if (e.name === 'password') {
    if (eVal === '') {
      formError(e, 'Please provide a password');
    } else if (!regixForm(e)) {
      formError(
        e,
        'Please provide at least one number, one special character, and one capital letter between 8 to 60 characters'
      );
    } else {
      formSuccess(e, 'Woohoo!');
    }
  }
};

function regixForm(e) {
  var regixResult = true;
  const regixPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;

  if (e.name === 'password') {
    eResult = regixPass.test(e.value);
  }

  return regixResult;
}
