/* eslint-disable */
import { formError, formSuccess } from './errorController';

export const checkForm = (email, password) => {
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();

  if (emailVal === '') {
    formError(email, 'Please provide an email');
  } else {
    formSuccess(email, 'Woohoo!');
  }

  if (passwordVal === '') {
    formError(password, 'Please provide a password');
  } else {
    formSuccess(password, 'Woohoo!');
  }
};
