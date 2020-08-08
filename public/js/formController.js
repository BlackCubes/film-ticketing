/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
  formStatus = 0;

  inputs.forEach(input => {
    var inputRequired = input.required;
    var inputVal = '';
    if (input.type !== 'file') inputVal = input.value.trim();

    if (input.name === 'email') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide an email', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please provide a valid email address',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'password' || input.name === 'current-password') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a password', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least one number, one special character, and one capital letter between 8 to 60 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'password-confirm') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please enter your password to confirm',
          inputRequired
        );
      } else if (
        inputVal !== inputs.find(i => i.name === 'password').value.trim() &&
        inputVal !== ''
      ) {
        validationFailure(
          input,
          'Please make sure your passwords match',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'name') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide your name', inputRequired);
      } else if (inputVal.length < 2) {
        validationFailure(
          input,
          'Please enter your name a minimum of 2 characters',
          inputRequired
        );
      } else if (inputVal.length > 70) {
        validationFailure(
          input,
          'Please enter your name that is 70 characters or less',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'username') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a username', inputRequired);
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter a username a minimum of 3 characters',
          inputRequired
        );
      } else if (inputVal.length > 9) {
        validationFailure(
          input,
          'Please enter a username that is 9 characters or less',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-month') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a month', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid month', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-day') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a day', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid day', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-year') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a year', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid year', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-gender') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a gender/non-gender',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use a valid gender/non-gender',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (
      (input.name === 'photo' && input.value !== '') ||
      input.name === 'poster'
    ) {
      if (inputRequired && input.value === '') {
        validationFailure(input, 'Please provide a poster', inputRequired);
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please select a valid image file of jpg, jpeg, or png',
          inputRequired
        );
        input.value = '';
      } else if (input.files[0].size > 1024000) {
        validationFailure(input, 'Max upload size is 1MB only', inputRequired);
        input.value = '';
      } else {
        input.name === 'photo'
          ? validationSuccess(input, 'Woohoo!', inputRequired)
          : validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-title') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a title', inputRequired);
      } else if (inputVal.length > 100) {
        validationFailure(
          input,
          'Please enter a title that is 100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-mpaa') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide an MPAA rating',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use a valid MPAA rating',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-duration') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a duration', inputRequired);
      } else if (parseInt(inputVal) < 10) {
        validationFailure(
          input,
          'Please enter a duration a minimum of 10 minutes',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please enter a duration in minutes that is at least 10 minutes long',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-contenttype') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Pleaase provide a content type',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use a valid content type',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-overview') {
      if (inputVal === '') {
        validationFailure(input, 'Please enter an overview', inputRequired);
      } else if (inputVal.length > 183) {
        validationFailure(
          input,
          'Please enter an overview that is 183 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-synopsis' && inputVal !== '') {
      if (inputVal.length > 1100) {
        validationFailure(
          input,
          'Please enter a synopsis that is 1100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-language' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter language(s) a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-subtitles' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter subtitles a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-genre' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter genre(s) a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-price') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a price', inputRequired);
      } else if (parseFloat(inputVal) < 5) {
        validationFailure(
          input,
          'Please enter a price a minimum of $5',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please provide a valid price with a minimum of $5',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (
      (input.name === 'select-specialvenue' ||
        input.name === 'select-privatevenue') &&
      inputVal !== ''
    ) {
      if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid value', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-eventowner') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide the ID for the event organizer',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please use a valid MongoDB ObjectID');
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'theater-name') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a name', inputRequired);
      } else if (inputVal.length < 7) {
        validationFailure(
          input,
          'Please enter a name a minimum of 7 characters',
          inputRequired
        );
      } else if (inputVal.length > 100) {
        validationFailure(
          input,
          'Please enter a name that is 100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'phone') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a phone number',
          inputRequired
        );
      } else if (!regexForm(input)) {
        validationFailure(
          input,
          'Please provide a valid phone number in the form of (###)###-#### or (###) ###-####'
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'linkurl' && inputVal !== '') {
      if (!regexForm(input)) {
        validationFailure(
          input,
          'Please use a valid url that has .com, .net, .gov, .org, or .in, and with protocol http or https'
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'address') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide an address', inputRequired);
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter an address a minimum of 3 characters'
        );
      } else if (inputVal.length > 96) {
        validationFailure(
          input,
          'Please enter an address that is less than or equal to 96 characters'
        );
      } else if (!regexForm(input)) {
        validationFailure(input, 'Please provide a valid US address');
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
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
  const regexPrice = /^(?!0*\.0+$)\d*(?:\.\d+)?$/;
  const regexVenue = /^\b(y|n)\b$/;
  const regexPhone = /[\(]\d{3}[\)]\s?\d{3}[\-]\d{4}/;
  const regexURL = /http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/;
  const regexAddress = /^[A-Z0-9 ,#\'\/.]{3,96}$/iu;
  const regexMongo = /^[a-f\d]{24}$/i;

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
  } else if (e.name === 'show-price') {
    regexResult = regexPrice.test(parseFloat(e.value));
  } else if (
    e.name === 'select-specialvenue' ||
    e.name === 'select-privatevenue'
  ) {
    regexResult = regexVenue.test(e.value);
  } else if (e.name === 'show-eventowner') {
    regexResult = regexMongo.test(e.value);
  } else if (e.name === 'phone') {
    regexResult = regexPhone.test(e.value);
  } else if (e.name === 'linkurl') {
    regexResult = regexURL.test(e.value);
  } else if (e.name === 'address') {
    regexResult = regexAddress.test(e.value);
  }

  return regexResult;
}
