/* eslint-disable */
import { showAlert } from './alerts';
import { parentNode } from './utils';

// export const formValidator = (input, type = '', bol) => {
//   if (type === 'input' && !input) {
//     showAlert('error', 'Error on input!');
//     bol = false;
//   }

//   if (type === 'select' && !input) {
//     showAlert('error', 'Error on the select!');
//     bol = false;
//   }

//   if (type === 'textarea' && !input) {
//     showAlert('error', 'Error on the textarea!');
//     bol = false;
//   }

//   return bol;
// };

export const attributeError = (input, message) => {
  if (!input) {
    showAlert('error', message);
    return window.setTimeout(() => {
      location.assign('/');
    }, 1000);
    // return false;
  }

  var classTarget = 'form__group';
  if (input.name === 'select-month') classTarget = 'form__date-month';
  if (input.name === 'select-day') classTarget = 'form__date-day';
  if (input.name === 'select-year') classTarget = 'form__date-year';
  if (input.name === 'select-hour') classTarget = 'form__date-hour';
  if (input.name === 'select-minute') classTarget = 'form__date-minute';
  if (input.name === 'select-second') classTarget = 'form__date-second';

  const attributeParent = parentNode(input, classTarget);

  attributeParent.classList.add('error');
  showAlert('error', message);

  if (input.name !== 'hexadecimal-btn') {
    const labelElement = input.nextElementSibling;
    labelElement.textContent = "Please don't do that";
  }

  return window.setTimeout(() => {
    location.assign('/');
  }, 1000);
  // return false;
};

export const formError = (input, message) => {
  var classTarget = 'form__group';
  if (input.name === 'select-month') classTarget = 'form__date-month';
  if (input.name === 'select-day') classTarget = 'form__date-day';
  if (input.name === 'select-year') classTarget = 'form__date-year';
  if (input.name === 'select-hour') classTarget = 'form__date-hour';
  if (input.name === 'select-minute') classTarget = 'form__date-minute';
  if (input.name === 'select-second') classTarget = 'form__date-second';

  const formParent = parentNode(input, classTarget);
  const labelElement = input.nextElementSibling;

  formParent.classList.add('error');
  formParent.classList.remove('success');
  labelElement.textContent = message;
  showAlert('error', 'There are items that require your attention');
};

export const formSuccess = (input, message) => {
  var classTarget = 'form__group';
  if (input.name === 'select-month') classTarget = 'form__date-month';
  if (input.name === 'select-day') classTarget = 'form__date-day';
  if (input.name === 'select-year') classTarget = 'form__date-year';
  if (input.name === 'select-hour') classTarget = 'form__date-hour';
  if (input.name === 'select-minute') classTarget = 'form__date-minute';
  if (input.name === 'select-second') classTarget = 'form__date-second';

  const formParent = parentNode(input, classTarget);
  const labelElement = input.nextElementSibling;

  formParent.classList.add('success');
  formParent.classList.remove('error');
  labelElement.textContent = message;
};
