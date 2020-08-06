/* eslint-disable */
import { formError, formSuccess } from './errorController';

export const checkForm = e => {
  const eVal = e.value.trim();
  // const passwordVal = password.value.trim();

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
    } else {
      formSuccess(e, 'Woohoo!');
    }
  }
};
