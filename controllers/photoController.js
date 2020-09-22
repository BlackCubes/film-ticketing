const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const path = require('path');
const Models = require('./../models');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const checkDate = require('./../utils/checkDate');

const multerStorage = multer.memoryStorage();

const parser = new DatauriParser();

// cloudinary.config()

// MULTER SETUP

const multerFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (file.mimetype.startsWith('image') && extName && mimeType) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024000 },
  fileFilter: multerFilter
});

// BUFFER THE PHOTO
exports.bufferPhoto = key =>
  catchAsync(async (req, res, next) => {
    const streamUpload = upload.single(`${key}`);

    streamUpload(req, res, function(err) {
      if (err instanceof multer.MulterError)
        return next(new AppError(`${err.message}`, 400));

      if (err) return next(new AppError(`${err.message}`, 400));

      next();
    });
  });

// CONVERT BUFFER
const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

// CLOUDINARY
const cloudinaryUpload = (file, preset) =>
  cloudinary.uploader.upload(file, {
    upload_preset: `${preset}`
  });
const cloudinaryDelete = file => cloudinary.uploader.destroy(file);

// UPLOAD
exports.uploadPhoto = (preset, required = true) =>
  catchAsync(async (req, res, next) => {
    if (!req.file && required)
      return next(new AppError('You must provide an image!', 400));
    if (!req.file && !required) return next();

    const file64 = formatBufferTo64(req.file);

    const cloudinaryResult = await cloudinaryUpload(file64.content, preset);

    if (!cloudinaryResult) {
      return next(
        new AppError(
          'There is a problem uploading your image! Please contact the system administrator.',
          422
        )
      );
    }

    req.body.cloudinaryPhoto = {
      cloudinaryId: cloudinaryResult.public_id,
      cloudinaryUrl: cloudinaryResult.secure_url
    };

    next();
  });

// DELETE
exports.deletePhoto = photoType =>
  catchAsync(async (req, res, next) => {
    if (
      photoType === 'users' &&
      (!req.params.userPhoto ||
        req.params.userPhoto === 'default' ||
        req.params.userPhoto === 'admin')
    )
      return next();

    let paramsExt;

    if (photoType === 'shows') paramsExt = req.params.showPoster;
    if (photoType === 'users') paramsExt = req.params.userPhoto;
    if (photoType === 'theaters') paramsExt = req.params.theaterPhoto;
    if (photoType === 'castcrews') paramsExt = req.params.castcrewsPhoto;

    const cloudinaryResult = await cloudinaryDelete(
      `kinetotickets/${photoType}/${paramsExt}`
    );

    if (cloudinaryResult.result !== 'ok') {
      return next(
        new AppError(
          'There is a problem deleting your image! Please contact the system administrator.',
          422
        )
      );
    }

    next();
  });

// CHECK IF THE PHOTO HAS BEEN UPLOADED 24HRS RECENTLY
exports.checkPhotoUpload = table =>
  catchAsync(async (req, res, next) => {
    if (table === 'User' && !req.params.userPhoto) return next();

    let queryType;
    if (table === 'User') queryType = req.user.id;
    if (table === 'Show') queryType = req.params.id;

    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 1));

    const query = await Models[table].findById(queryType);
    const { cloudinaryUploadedAt } = query;

    if (checkDate(cloudinaryUploadedAt, pastDate))
      return next(
        new AppError(
          'You need to wait at least 24 hours after you have uploaded your previous photo before adding a new one.',
          403
        )
      );

    next();
  });
