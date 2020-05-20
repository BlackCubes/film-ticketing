const Theater = require('./../models/theaterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

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
