/* eslint-disable */
import { showAlert } from './alerts';

export const formValidator = (input, type = '', bol) => {
  if (type === 'input' && !input) {
    showAlert('error', 'Error on input!');
    bol = false;
  }

  if (type === 'select' && !input) {
    showAlert('error', 'Error on the select!');
    bol = false;
  }

  if (type === 'textarea' && !input) {
    showAlert('error', 'Error on the textarea!');
    bol = false;
  }

  return bol;
};

export const formError = (input, message) => {
  const formParent = input.parentElement;
  const formGrandparent = formParent.parentElement;
  const labelElement = formParent.querySelector('label');

  formParent.classList.add('error');
  formGrandparent.classList.add('error');
  labelElement.textContent = message;
  showAlert('error', 'There are items that require your attention');
};

export const formSuccess = (input, message) => {
  const formParent = input.parentElement;
  const formGrandparent = formParent.parentElement;
  const labelElement = formParent.querySelector('label');

  formParent.classList.add('success');
  formGrandparent.classList.add('success');
  labelElement.textContent = message;
};
