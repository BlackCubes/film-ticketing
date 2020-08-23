var cloudinary = require('cloudinary').v2;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
});
