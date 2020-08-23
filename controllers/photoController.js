var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

exports.bufferShowPhoto = key => upload.single(`${key}`);

exports.uploadPhoto = (req, res, next) => {
  if (!req.file) return next();

  console.log('Req.file: ', req.file);
  console.log('Req.file.buffer: ', req.file.buffer);

  next();
};
