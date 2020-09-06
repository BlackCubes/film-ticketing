const Validator = require('validatorjs');

const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexNameOpt = /^([a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*)?$/;
const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
const regexUsernameOpt = /^((?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9})?$/;
// const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
const regexGender = /^\b(f|m|p)\b$/;
const regexGenderOpt = /^(\b(f|m|p)\b)?$/;
const regexMpaa = /^\b(G|PG|PG-13|R|NC-17|NR|Unrated|TV-Y|TV-Y7|TV-G|TV-PG|TV-14|TV-MA)\b$/;
const regexMpaaOpt = /^(\b(G|PG|PG-13|R|NC-17|NR|Unrated|TV-Y|TV-Y7|TV-G|TV-PG|TV-14|TV-MA)\b)?$/;
const regexContent = /^\b(Film|TV)\b$/;
const regexContentOpt = /^(\b(Film|TV)\b)?$/;
const regexPrice = /^(?!0*\.0+$)\d*(?:\.\d+)?$/;
const regexSelectOpt = /^(\b(y|n)\b)?$/;
const regexMongo = /^[a-f\d]{24}$/i;
const regexDurationOpt = /^([1-9]{1}[0-9]{1,})?$/;

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
  "Please use a valid gender/non-gender of m='male', f='female', or p='prefer not to say'."
);
Validator.register(
  'regexGenderOpt',
  val => regexGenderOpt.test(val),
  "Please use a valid gender/non-gender of m='male', f='female', or p='prefer not to say'."
);
Validator.register(
  'regexMpaa',
  val => regexMpaa.test(val),
  "Please use a valid MPAA rating of 'G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'Unrated', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', or 'TV-MA'."
);
Validator.register(
  'regexMpaaOpt',
  val => regexMpaaOpt.test(val),
  "Please use a valid MPAA rating of 'G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'Unrated', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', or 'TV-MA'."
);
Validator.register(
  'regexContent',
  val => regexContent.test(val),
  "Please use a valid content type of 'Film' or 'TV'."
);
Validator.register(
  'regexContentOpt',
  val => regexContentOpt.test(val),
  "Please use a valid content type of 'Film' or 'TV'."
);
Validator.register(
  'regexPrice',
  val => regexPrice.test(val),
  'Please provide a valid price with a minimum of $5.'
);
Validator.register(
  'regexSelectOpt',
  val => regexSelectOpt.test(val),
  "Please use a valid value of y='yes' or n='no'."
);
Validator.register(
  'regexMongo',
  val => regexMongo.test(val),
  'Please use a valid MongoDB ObjectID.'
);
Validator.register(
  'regexDurationOpt',
  val => regexDurationOpt.test(val),
  'Please enter a duration in minutes that is at least 10 minutes long.'
);

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
