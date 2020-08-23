var cloudinary = require('cloudinary').v2;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.uploadPhoto = (req, res, next) => {
  if (!req.file) return next();

  console.log('Req: ', req);
  console.log('Req.file: ', req.file);

  res.status(200).json({
    status: 'success'
  });
};
