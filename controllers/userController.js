const factory = require('./handlerFactory');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const filterObj = require('./../utils/filterObject');
const sanitize = require('./../utils/sanitize');

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = [req.user.id];
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update! Please use /updateMyPassword.',
        403
      )
    );
  }

  let filteredBody = filterObj(
    req.body,
    'name',
    'username',
    'email',
    'birthdate',
    'gender',
    'cloudinaryPhoto'
  );
  // if (req.file) filteredBody.photo = req.file.filename; DELETE?

  // const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
  //   new: true,
  //   runValidators: true
  // });
  filteredBody = sanitize(filteredBody);
  console.log('Filtered Body: ', filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      user: 'This is a cloudinary test! Refactor when done.'
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  if (
    req.user.role === 'admin' &&
    req.params.id &&
    req.params.id === req.user.id
  )
    return next(
      new AppError('You cannot deactivate your account as an admin!', 403)
    );

  let query;
  if (req.user.role === 'admin' && req.params.id) query = req.params.id;
  if (req.user.role === 'user') query = req.user.id;

  const queryStatus = await User.findByIdAndUpdate(query, { active: false });

  if (!queryStatus)
    return next(
      new AppError('An error has occured. Please contact the system admin', 500)
    );

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.reactivateMe = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin' && req.params.id === req.user.id)
    return next(
      new AppError('You cannot reactivate your account as an admin!', 403)
    );

  const userExist = await User.findById(req.params.id);

  if (!userExist) return next(new AppError('This user does not exist!', 404));

  const user = await User.findByIdAndUpdate(req.params.id, { active: true });

  if (!user)
    return next(new AppError('An error has occured on activating', 500));

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead.'
  });
};

// DO NOT UPDATE PASSWORDS WITH THIS!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
