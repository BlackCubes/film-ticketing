const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const validator = require('./../utils/validate');

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string|min:8|max:60|regexPass'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      console.log(err);
      return next(
        new AppError(
          'A test message for validator fail for validation controller',
          401
        )
      );
    }

    next();
  });
});
