const Validator = require('validatorjs');

// const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;

Validator.register(
  'regexPass',
  val => regexPass.test(val),
  'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
);

module.exports = (body, rules, customMessages, cb) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => cb(null, true));
  validation.fails(() => cb(validation.errors, false));
};
