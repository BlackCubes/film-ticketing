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
  const testing = 'hello';

  const cloudinaryUpload = stream => {
    const cloudinaryStream = cloudinary.uploader.upload_stream(
      {
        upload_preset: 'kinetotickets-shows'
      },
      function(error, result) {
        if (result) {
          cloudinaryId = result.public_id;
          cloudinaryUrl = result.secure_url;
        } else {
          return next(
            new AppError(
              'There is a problem uploading your image! Please contact the system administrator',
              500
            )
          );
        }
      }
    );

    streamifier.createReadStream(stream).pipe(cloudinaryStream);
  };

  // const cloudinaryUpload = async stream => {
  //   try {
  //     await new Promise((resolve, reject) => {
  //       const cloudinaryStream = cloudinary.uploader.upload_stream(
  //         {
  //           upload_preset: 'kinetotickets-shows'
  //         },
  //         function(error, result) {
  //           if (result) {
  //             cloudinaryId = result.public_id;
  //             cloudinaryUrl = result.secure_url;
  //             resolve(cloudinaryId);
  //           } else {
  //             reject(error);
  //           }
  //         }
  //       );
  //       streamifier.createReadStream(stream).pipe(cloudinaryStream);
  //     });
  //   } catch (err) {
  //     throw new AppError(
  //       'There is a problem uploading your image! Please contact the system administrator.',
  //       500
  //     );
  //   }
  // };

  console.log('CloudinaryID: ', cloudinaryId);
  console.log('CloudinaryURL: ', cloudinaryUrl);
  // await cloudinaryUpload(req.file.buffer);
  await cloudinaryUpload(testing);

  req.body.poster = { cloudinaryId, cloudinaryUrl };

  // console.log('Cloudinary Result: ', uploadCloudinary);

  // req.body.poster = {
  //   cloudinaryId: uploadCloudinary.public_id,
  //   cloudinaryUrl: uploadCloudinary.secure_url
  // };

  next();
});
