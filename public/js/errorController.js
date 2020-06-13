/* eslint-disable */
import { showAlert } from './alerts';

export const formValidator = (input, type) => {
  if (type === 'title' && !input) {
    showAlert('error', 'Error on title!');
    return false;
  }

  if (type === 'showDuration' && !input) {
    showAlert('error', 'Error on the show duration!');
    return false;
  }
};
