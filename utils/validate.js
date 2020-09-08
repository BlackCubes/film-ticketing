const Validator = require('validatorjs');
const Models = require('./../models');
const capitalize = require('./capitalize');

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
const regexMongoOpt = /^([a-f\d]{24})?$/i;
const regexDurationOpt = /^([1-9]{1}[0-9]{1,})?$/;
const regexPhone = /^[(]\d{3}[)]\s?\d{3}[-]\d{4}$/;
const regexPhoneOpt = /^([(]\d{3}[)]\s?\d{3}[-]\d{4})?$/;
const regexAddress = /^[A-Z0-9 ,#'/.]{3,96}$/iu;
const regexAddressOpt = /^([A-Z0-9 ,#'/.]{3,96})?$/iu;
const regexUnicode = /^[a-zA-Z\u0080-\u024F]+(?:([ \-']|(\. ))[a-zA-Z\u0080-\u024F]+)*$/;
const regexUnicodeOpt = /^([a-zA-Z\u0080-\u024F]+(?:([ \-']|(\. ))[a-zA-Z\u0080-\u024F]+)*)?$/;
const regexState = /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/;
const regexZipCode = /^[0-9]{5}$/;
const regexZipCodeOpt = /^([0-9]{5})?$/;
const regexLongitude = /^[+-]?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
const regexLatitude = /^[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
const regexRating = /^[1-5]{1}$/;
const regexRatingOpt = /^([1-5]{1})?$/;

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
  'Please provide a valid price with a minimum of 5.'
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
  'regexMongoOpt',
  val => regexMongoOpt.test(val),
  'Please use a valid MongoDB ObjectID.'
);
Validator.register(
  'regexDurationOpt',
  val => regexDurationOpt.test(val),
  'Please enter a duration in minutes that is at least 10 minutes long.'
);
Validator.register(
  'regexPhone',
  val => regexPhone.test(val),
  'Please provide a valid phone number in the form of (###)###-#### or (###) ###-####.'
);
Validator.register(
  'regexPhoneOpt',
  val => regexPhoneOpt.test(val),
  'Please provide a valid phone number in the form of (###)###-#### or (###) ###-####.'
);
Validator.register(
  'regexAddress',
  val => regexAddress.test(val),
  'Please provide a valid US address.'
);
Validator.register(
  'regexAddressOpt',
  val => regexAddressOpt.test(val),
  'Please provide a valid US address.'
);
Validator.register(
  'regexCity',
  val => regexUnicode.test(val),
  'Please provide a valid US city that is at least 3 characters long and 50 characters max.'
);
Validator.register(
  'regexCityOpt',
  val => regexUnicodeOpt.test(val),
  'Please provide a valid US city that is at least 3 characters long and 50 characters max.'
);
Validator.register(
  'regexState',
  val => regexState.test(val),
  'Please provide a valid US state that is 2 characters long, capitalize, and abbreviated.'
);
Validator.register(
  'regexZipCode',
  val => regexZipCode.test(val),
  'Please provide a valid US ZIP code that is 5 characters long.'
);
Validator.register(
  'regexZipCodeOpt',
  val => regexZipCodeOpt.test(val),
  'Please provide a valid US ZIP code that is 5 characters long.'
);
Validator.register(
  'regexGeo',
  function(val) {
    return regexLongitude.test(val[0]) && regexLatitude.test(val[1]);
  },
  'Please provide a valid longitude that is between -180 and 180 degrees, and/or a valid latitude that is between -90 and 90 degrees.'
);
Validator.register(
  'regexCastCrewName',
  val => regexUnicode.test(val),
  'Please provide a valid name that is between 2 and 70 characters.'
);
Validator.register(
  'regexCastCrewNameOpt',
  val => regexUnicodeOpt.test(val),
  'Please provide a valid name that is between 2 and 70 characters.'
);
Validator.register(
  'regexRoles',
  function(val) {
    return val.join(', ').length >= 4;
  },
  'Please enter role(s) a minimum of 4 characters.'
);
Validator.register(
  'regexRolesOpt',
  function(val) {
    if (!val.join(', ')) return true;
    return val.join(', ').length >= 4;
  },
  'Please enter role(s) a minimum of 4 characters.'
);
Validator.register(
  'regexRating',
  val => regexRating.test(val),
  'Please provide a valid rating between 1 and 5.'
);
Validator.register(
  'regexRatingOpt',
  val => regexRatingOpt.test(val),
  'Please provide a valid rating between 1 and 5.'
);

Validator.registerAsync('exist', function(value, attrubute, req, passes) {
  if (!attrubute)
    throw new Error('Specify Requirements i.e. fieldName: exist:table,column');

  const attArr = attrubute.split(',');
  if (attArr.length !== 2)
    throw new Error(`Invalid format for validation rule on ${attrubute}`);

  const { 0: table, 1: column } = attArr;

  const msg =
    column === 'username'
      ? `${capitalize(column)} has already been taken.`
      : `${capitalize(column)} already in use.`;

  Models[table].valueExists({ [column]: value }).then(result => {
    if (result) {
      passes(false, msg);
      return;
    }
    passes();
  });
});

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
