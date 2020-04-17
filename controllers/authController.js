const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    birthdate: req.body.birthdate,
    gender: req.body.gender
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
