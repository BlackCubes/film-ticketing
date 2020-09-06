const Validator = require('validatorjs');

const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexNameOpt = /^([a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*)?$/;
const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
const regexUsernameOpt = /^((?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9})?$/;
// const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
const regexGender = /^\b(f|m|p)\b$/;

Validator.register(
  'regexName',
  val => regexName.test(val),
  'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters for the name.'
);
Validator.register(
  'regexNameOpt',
  val => regexNameOpt.test(val),
  'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters for the name.'
);
Validator.register(
  'regexUsername',
  val => regexUsername.test(val),
  'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters for the username.'
);
Validator.register(
  'regexUsernameOpt',
  val => regexUsernameOpt.test(val),
  'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters for the username.'
);
Validator.register(
  'regexPass',
  val => regexPass.test(val),
  'Please use at least one number, one special character, and one capital letter between 8 to 60 characters for the password.'
);
Validator.register(
  'regexGender',
  val => regexGender.test(val),
  "Please use a valid gender/non-gender with m='male', f='female', or p='prefer not to say'."
);

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
