/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
  formStatus = 0;

  inputs.forEach(input => {
    var inputVal = '';
    if (input.type !== 'file') inputVal = input.value.trim();

    if (input.name === 'email') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide an email', true);
        // formError(input, 'Please provide an email');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please provide a valid email address', true);
        // formError(input, 'Please provide a valid email address');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password' || input.name === 'current-password') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a password', true);
        // formError(input, 'Please provide a password');
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least one number, one special character, and one capital letter between 8 to 60 characters',
          true
        );
        // formError(
        //   input,
        //   'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password-confirm') {
      if (inputVal === '') {
        validationFailure(input, 'Please enter your password to confirm', true);
        // formError(input, 'Please enter your password to confirm');
      } else if (
        inputVal !== inputs.find(i => i.name === 'password').value.trim() &&
        inputVal !== ''
      ) {
        validationFailure(input, 'Please make sure your passwords match', true);
        // formError(input, 'Please make sure your passwords match');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'name') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide your name', true);
        // formError(input, 'Please provide your name');
      } else if (inputVal.length < 2) {
        validationFailure(
          input,
          'Please enter your name a minimum of 2 characters',
          true
        );
        // formError(input, 'Please enter your name a minimum of 2 characters');
      } else if (inputVal.length > 70) {
        validationFailure(
          input,
          'Please enter your name that is 70 characters or less',
          true
        );
        // formError(
        //   input,
        //   'Please enter your name that is 70 characters or less'
        // );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters',
          true
        );
        // formError(
        //   input,
        //   'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'username') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a username', true);
        // formError(input, 'Please provide a username');
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter a username a minimum of 3 characters',
          true
        );
        // formError(input, 'Please enter a username a minimum of 3 characters');
      } else if (inputVal.length > 9) {
        validationFailure(
          input,
          'Please enter a username that is 9 characters or less',
          true
        );
        // formError(
        //   input,
        //   'Please enter a username that is 9 characters or less'
        // );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters',
          true
        );
        // formError(
        //   input,
        //   'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-month') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a month', true);
        // formError(input, 'Please provide a month');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid month', true);
        // formError(input, 'Please use a valid month');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-day') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a day', true);
        // formError(input, 'Please provide a day');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid day', true);
        // formError(input, 'Please use a valid day');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-year') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a year', true);
        // formError(input, 'Please provide a year');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid year', true);
        // formError(input, 'Please use a valid year');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-gender') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a gender/non-gender', true);
        // formError(input, 'Please provide a gender/non-gender');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid gender/non-gender', true);
        // formError(input, 'Please use a valid gender/non-gender');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (
      (input.name === 'photo' && input.value !== '') ||
      input.name === 'poster'
    ) {
      var photoBool = input.name === 'photo' ? false : true;

      if (!regexForm(input)) {
        validationFailure(
          input,
          'Please select a valid image file of jpg, jpeg, or png',
          photoBool
        );
        // formError(
        //   input,
        //   'Please select a valid image file of jpg, jpeg, or png'
        // );
        input.value = '';
      } else if (input.files[0].size > 1024000) {
        validationFailure(input, 'Max upload size is 1MB only', photoBool);
        // formError(input, 'Max upload size is 1MB only');
        input.value = '';
      } else if (photoBool && input.value === '') {
        validationFailure(input, 'Please provide a poster', photoBool);
        // formError(input, 'Please provide a poster');
      } else {
        input.name === 'photo'
          ? validationSuccess(input, 'Woohoo!', photoBool)
          : validationSuccess(input, 'Woohoo!', photoBool);
        // formSuccess(input, 'Woohoo!');
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'show-title') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a title', true);
        // formError(input, 'Please provide a title');
      } else if (inputVal > 100) {
        validationFailure(
          input,
          'Please enter a title that is 100 characters or less',
          true
        );
        // formError(input, 'Please enter a title that is 100 characters or less');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSucces(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-mpaa') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide an MPAA rating', true);
        // formError(input, 'Please provide an MPAA rating');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid MPAA rating', true);
        // formError(input, 'Please use a valid MPAA rating');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'show-duration') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a duration', true);
        // formError(input, 'Please provide a duration');
      } else if (parseInt(inputVal) < 10) {
        validationFailure(
          input,
          'Please enter a duration a minimum of 10 minutes',
          true
        );
        // formError(input, 'Please enter a duration a minimum of 10 minutes');
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please enter a duration in minutes that is at least 10 minutes long',
          true
        );
        // formError(
        //   input,
        //   'Please enter a duration in minutes that is at least 10 minutes long'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-contenttype') {
      if (inputVal === '') {
        validationFailure(input, 'Pleaase provide a content type', true);
        // formError(input, 'Pleaase provide a content type');
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid content type', true);
        // formError(input, 'Please use a valid content type');
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'textarea-overview') {
      if (inputVal === '') {
        validationFailure(input, 'Please enter an overview', true);
        // formError(input, 'Please enter an overview');
      } else if (inputVal.length > 183) {
        validationFailure(
          input,
          'Please enter an overview that is 183 characters or less',
          true
        );
        // formError(
        //   input,
        //   'Please enter an overview that is 183 characters or less'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', true);
        // formSuccess(input, 'Woohoo!');
        // formStatus += 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'textarea-synopsis' && inputVal !== '') {
      if (inputVal.length > 1100) {
        validationFailure(
          input,
          'Please enter a synopsis that is 1100 characters or less',
          false
        );
        // formError(
        //   input,
        //   'Please enter a synopsis that is 1100 characters or less'
        // );
      } else {
        validationSuccess(input, 'Woohoo!', false);
        // formSuccess(input, 'Woohoo!');
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'show-genre' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter genre(s) a minimum of 3 characters',
          false
        );
        // formError(input, 'Please enter genre(s) a minimum of 3 characters');
        // formStatus -= 1;
        // console.log(`${input.name.toUpperCase()} part: `, formStatus);
      } else {
        validationSuccess(input, 'Woohoo!', false);
      }
    }
  });
};

function validationSuccess(input, message, required) {
  formSuccess(input, message);
  if (required) formStatus += 1;
  console.log(`${input.name.toUpperCase()} part: `, formStatus);
}

function validationFailure(input, message, required) {
  formError(input, message);
  if (!required) formStatus -= 1;
  console.log(`${input.name.toUpperCase()} part: `, formStatus);
}

function regexForm(e) {
  var regexResult = true;
  // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
  const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
  const regexDateMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const regexDateDay = [...Array(32).keys()].splice(1);
  const now = new Date().getFullYear();
  const regexDateYear = Array(now - (now - 101))
    .fill('')
    .map((val, i) => now - i);
  const regexGender = ['f', 'm', 'p'];
  const regexPhoto = /^\b(jpeg|jpg|png)\b$/;
  const regexMpaa = [
    'G',
    'PG',
    'PG-13',
    'R',
    'NC-17',
    'NR',
    'Unrated',
    'TV-Y',
    'TV-Y7',
    'TV-G',
    'TV-PG',
    'TV-14',
    'TV-MA'
  ];
  const regexDuration = /^[1-9]{1}[0-9]{1,}$/;
  const regexContent = /^\b(Film|TV)\b$/;

  if (e.name === 'password' || e.name === 'current-password') {
    regexResult = regexPass.test(e.value);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(e.value);
  } else if (e.name === 'name') {
    regexResult = regexName.test(e.value);
  } else if (e.name === 'username') {
    regexResult = regexUsername.test(e.value);
  } else if (e.name === 'select-month') {
    regexResult = regexDateMonth.includes(e.value);
  } else if (e.name === 'select-day') {
    regexResult = regexDateDay.includes(parseInt(e.value));
  } else if (e.name === 'select-year') {
    regexResult = regexDateYear.includes(parseInt(e.value));
  } else if (e.name === 'select-gender') {
    regexResult = regexGender.includes(e.value);
  } else if (e.name === 'photo' || e.name === 'poster') {
    regexResult = regexPhoto.test(
      e.files[0].type
        .split('/')
        .pop()
        .toLowerCase()
    );
  } else if (e.name === 'select-mpaa') {
    regexResult = regexMpaa.includes(e.value);
  } else if (e.name === 'show-duration') {
    regexResult = regexDuration.test(parseInt(e.value));
  } else if (e.name === 'select-contenttype') {
    regexResult = regexContent.test(e.value);
  }

  return regexResult;
}
