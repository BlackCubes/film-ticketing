/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
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
  });

  // const eVal = e.value.trim();

  // if (e.name === 'email') {
  //   if (eVal === '') {
  //     formError(e, 'Please provide an email');
  //     // formStatus -= 1;
  //   } else if (!regexForm(e)) {
  //     formError(e, 'Please provide a valid email address');
  //     // formStatus -= 1;
  //   } else {
  //     formSuccess(e, 'Woohoo!');
  //     formStatus += 1;
  //     console.log('Email part: ', formStatus);
  //   }
  // }

  // if (e.name === 'password') {
  //   if (eVal === '') {
  //     formError(e, 'Please provide a password');
  //     // formStatus -= 1;
  //   } else if (!regexForm(e)) {
  //     formError(
  //       e,
  //       'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
  //     );
  //     // formStatus -= 1;
  //   } else {
  //     formSuccess(e, 'Woohoo!');
  //     formStatus += 1;
  //     console.log('Password part: ', formStatus);
  //   }
  // }

  // if (e2 !== undefined && e2.name === 'password-confirm') {
  //   if (e2.value === '') {
  //     formError(e2, 'Please enter your password to confirm');
  //     // formStatus -= 1;
  //   } else if (e2.value.trim() !== eVal && e2.value !== '') {
  //     formError(e2, 'Please make sure your passwords match');
  //     // formStatus -= 1;
  //   } else {
  //     formSuccess(e2, 'Woohoo!');
  //     formStatus += 1;
  //     console.log('Password confirm part: ', formStatus);
  //   }
  // }
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
