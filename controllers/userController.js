const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// MULTER
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('This is not an image! Please upload only images!', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.deletePhoto = catchAsync(async (req, res, next) => {
  if (!req.params.userPhoto || req.params.userPhoto.split('.')[0] === 'default')
    return next();
  if (
    req.params.userPhoto.split('.')[1] !== 'jpeg' ||
    req.params.userPhoto.split('-').length !== 3 ||
    req.params.userPhoto.split('-')[0] !== 'user'
  )
    return next(new AppError('This route is for updating photos!', 400));

  const unlinkAsync = promisify(fs.unlink);
  const photoPath = path.join('public/img/users/', req.params.userPhoto);

  await unlinkAsync(photoPath);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

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
        400
      )
    );
  }

  const filteredBody = filterObj(
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
  console.log('Filtered Body: ', filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      user: 'This is a cloudinary test! Refactor when done.'
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
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
