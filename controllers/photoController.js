const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');
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
  let cloudinaryId = '';
  let cloudinaryUrl = '';

  const uploadCloudinary = await cloudinary.uploader.upload_stream(
    {
      upload_preset: 'kinetotickets-shows'
    },
    function(err, result) {
      if (err) {
        return next(
          new AppError(
            'There is a problem uploading your image! Please contact the system administration.',
            500
          )
        );
      }
      return next(new AppError('This is a test for errors..', 400));
    }
  );

  const uploadResult = streamifier
    .createReadStream(req.file.buffer)
    .pipe(uploadCloudinary);

  console.log(uploadResult);
  // console.log('CloudinaryID: ', cloudinaryId);
  // console.log('CloudinaryURL: ', cloudinaryUrl);

  req.body.poster = { cloudinaryId, cloudinaryUrl };

  // console.log('Cloudinary Result: ', uploadCloudinary);

  // req.body.poster = {
  //   cloudinaryId: uploadCloudinary.public_id,
  //   cloudinaryUrl: uploadCloudinary.secure_url
  // };

  next();
});
