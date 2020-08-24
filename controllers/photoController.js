const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const path = require('path');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const parser = new DatauriParser();

// cloudinary.config()

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

exports.bufferPhoto = key => upload.single(`${key}`);

const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const cloudinaryUpload = (file, preset) =>
  cloudinary.uploader.upload(file, {
    upload_preset: `${preset}`
  });

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const file64 = formatBufferTo64(req.file);
  const testing = 'hello';

  const cloudinaryResult = await cloudinaryUpload(
    testing,
    'kinetotickets-shows'
  );

  if (!cloudinaryResult) {
    return next(new AppError('There is a problem uploading your image!', 422));
  }

  req.body.poster = {
    cloudinaryId: cloudinaryResult.public_id,
    cloudinaryUrl: cloudinaryResult.secure_url
  };

  next();
});
