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
  const file64 = '';

  let cloudinaryId = '';
  let cloudinaryUrl = '';
  const testing = 'hello';

  const cloudinaryStream = await cloudinary.uploader.upload(file64, {
    upload_preset: 'kinetotickets-shows'
  });

  if (!cloudinaryStream) {
    return next(new AppError('There is a problem uploading your image!', 500));
  }

  console.log('CloudinaryID: ', cloudinaryId);
  console.log('CloudinaryURL: ', cloudinaryUrl);
  // await cloudinaryUpload(req.file.buffer);

  req.body.poster = { cloudinaryId, cloudinaryUrl };

  // console.log('Cloudinary Result: ', uploadCloudinary);

  // req.body.poster = {
  //   cloudinaryId: uploadCloudinary.public_id,
  //   cloudinaryUrl: uploadCloudinary.secure_url
  // };

  next();
});
