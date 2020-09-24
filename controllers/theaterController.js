const Theater = require('./../models/theaterModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.geoParse = (req, res, next) => {
  if (!req.body.geo) return next();
  if (typeof req.body.geo !== 'string')
    return next(new AppError('Please provide a JSON string for geo', 400));

  req.body.geo = { type: 'Point', coordinates: JSON.parse(req.body.geo) };
  console.log(req.body.geo);
  next();
};

exports.geoNonParse = (req, res, next) => {
  if (!req.body.geoLong || !req.body.geoLat) return next();

  req.body.geo = { coordinates: [req.body.geoLong, req.body.geoLat] };
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
