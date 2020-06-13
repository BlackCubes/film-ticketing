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
