const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

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

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  console.log('Req.file: ', req.file);
  console.log('Req.file.buffer: ', req.file.buffer);

  // const fileName = req.file.originalname;

  const uploadStream = cloudinary.uploader.upload_stream();

  const uploadResult = await fs.createReadStream(req.file.buffer);

  console.log(uploadResult);

  // req.body.poster = { urlLarge: uploadResult.url };

  next();
});
