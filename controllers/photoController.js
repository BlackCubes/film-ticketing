const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const multer = require('multer');
const path = require('path');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
    cb(
      new AppError('This is not an image! Please upload only images!', 400),
      false
    );
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
      console.log(Object.values(err));
      if (err instanceof multer.MulterError) {
        console.log(err.message);
        return next(
          new AppError(`An error occured when uploading: ${err}`, 401)
        );
      }

      if (err) {
        console.log(err);
        return next(
          new AppError(`An unknown error occured when uploading: ${err}`, 401)
        );
      }

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

    console.log('CloudinaryId: ', cloudinaryResult.public_id);
    console.log('CloudinaryUrl: ', cloudinaryResult.secure_url);

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
      (!req.params.userPhoto || req.params.userPhoto === 'default.jpg')
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
