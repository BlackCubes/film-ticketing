const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multer = require('multer');
const sharp = require('sharp');
const Theater = require('./../models/theaterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

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

// exports.uploadTheaterPhoto = (req, res, next) => {
//   upload.single(`${req.params.type}`);
//   next();
// };
exports.uploadTheaterPhoto = upload.single('photo');

exports.resizeTheaterPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  if (req.params.type === 'theaterPhoto') {
    req.body.photo = `theater-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(800, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`public/img/theaters/${req.body.photo}`);
  } else if (req.params.type === 'chainLogo') {
    req.body.chainLogo = `theater-${req.user.id}-${Date.now()}-chainlogo.jpeg`;

    await sharp(req.file.buffer)
      .resize(800, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`public/img/theaters/${req.body.chainLogo}`);
  }

  next();
});

exports.uploadTheaterPhotos = upload.fields([
  { name: 'theaterPhoto', maxCount: 1 },
  { name: 'chainPhoto', maxCount: 1 }
]);

exports.resizeTheaterPhotos = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.photo = `theater-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.files.theaterPhoto[0].buffer)
    .resize(800, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`public/img/theaters/${req.body.photo}`);

  req.body.chainLogo = `theater-${req.user.id}-${Date.now()}-chainlogo.jpeg`;
  await sharp(req.files.chainPhoto[0].buffer)
    .resize(800, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`public/img/theaters/${req.body.chainLogo}`);

  next();
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  if (!req.params.photo) return next();
  // if (
  //   req.params.photo.split('.')[1] !== 'jpeg' ||
  //   req.params.photo.split('-').length !== 3 ||
  //   req.params.photo.split('-')[0] !== 'theater'
  // )
  //   return next(new AppError('This route is for updating photos!', 400));

  const unlinkAsync = promisify(fs.unlink);
  const photoPath = path.join('public/img/theaters/', req.params.photo);

  await unlinkAsync(photoPath);

  next();
});

exports.geoParse = (req, res, next) => {
  if (!req.body.geo) return next();

  req.body.geo = { coordinates: JSON.parse(req.body.geo) };
  next();
};

exports.getAllTheaters = factory.getAll(Theater);
exports.getTheater = factory.getOne(Theater, 'showtimes');
exports.createTheater = factory.createOne(Theater);
exports.updateTheater = factory.updateOne(Theater);
exports.deleteTheater = factory.deleteOne(Theater);

exports.getTheatersWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format of lat,lng!',
        400
      )
    );
  }

  const theaters = await Theater.find({
    geo: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: theaters.length,
    data: {
      data: theaters
    }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format of lat,lng!',
        400
      )
    );
  }

  const distances = await Theater.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    results: distances.length,
    data: {
      data: distances
    }
  });
});

// exports.getAllTheaters = catchAsync(async (req, res, next) => {
//   const theaters = await Theater.find();

//   res.status(200).json({
//     status: 'success',
//     results: theaters.length,
//     data: {
//       theaters
//     }
//   });
// });

// exports.getTheater = catchAsync(async (req, res, next) => {
//   const theater = await Theater.findById(req.params.id).populate('showtimes');

//   if (!theater) {
//     return next(new AppError('There is no theater with that ID!', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       theater
//     }
//   });
// });

// exports.createTheater = catchAsync(async (req, res, next) => {
//   const newTheater = await Theater.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       theater: newTheater
//     }
//   });
// });

// exports.updateTheater = catchAsync(async (req, res, next) => {
//   const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   if (!theater) {
//     return next(new AppError('There is no theater with that id!', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       theater
//     }
//   });
// });

// exports.deleteTheater = catchAsync(async (req, res, next) => {
//   const theater = await Theater.findByIdAndDelete(req.params.id);

//   if (!theater) {
//     return next(new AppError('There is no theater with that id!', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });
