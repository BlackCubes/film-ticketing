const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const validator = require('./../utils/validate');

const errMessage = errObj => {
  let message = '';
  Object.values(errObj).forEach(err => {
    message += `${err[0]} `;
  });

  return message.slice(0, -1);
};

exports.insertPasswordConfirm = (req, res, next) => {
  req.body.password_confirm = req.body.passwordConfirm;
  console.log(req.body.passwordConfirm);
  next();
};

exports.signup = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:2|max:70|regexName',
    username: 'required|string|min:3|max:9|regexUsername',
    email: 'required|email',
    password: 'required|string|min:8|max:60|confirmed|regexPass',
    passwordConfirm: 'required|string',
    birthdate: 'required|date',
    gender: 'required|string|max:1|regexGender'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string|min:8|max:60|regexPass'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});
