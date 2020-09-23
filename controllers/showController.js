const factory = require('./handlerFactory');
const Show = require('./../models/showModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const checkDate = require('./../utils/checkDate');
const filterObj = require('./../utils/filterObject');
const sanitize = require('./../utils/sanitize');

exports.aliasTopShows = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,ratingsAverage,overview,mpaaRating,duration';

  next();
};

exports.getEventOrganizer = (req, res, next) => {
  req.body.eventOrganizer = [req.user.id];
  next();
};

exports.checkShowCreated = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 14));

  const shows = await Show.find({ eventOrganizer: req.user.id }).select(
    '+createdAt'
  );
  const createdAt = shows.map(el => el.createdAt);

  if (checkDate(createdAt, pastDate))
    return next(
      new AppError(
        'You need to wait at least 2 weeks after you created your previous show before starting a new one.',
        403
      )
    );

  next();
});

exports.createMyShow = catchAsync(async (req, res, next) => {
  if (req.body.ratingsAverage || req.body.ratingsQuantity) {
    return next(new AppError('This route is not for making reviews!', 403));
  }

  let filteredBody = filterObj(
    req.body,
    'title',
    'originalReleaseDate',
    'duration',
    'mpaaRating',
    'overview',
    'synopsis',
    'language',
    'subtitles',
    'contentType',
    'castcrew',
    'price',
    'priceDiscount',
    'genres',
    'specialVenue',
    'eventOrganizer',
    'poster',
    'cloudinaryPhoto'
  );

  filteredBody = sanitize(filteredBody);
  filteredBody.cloudinaryPhoto = req.body.cloudinaryPhoto;

  const newShow = await Show.create(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      data: newShow
    }
  });
});

exports.updateMyShow = catchAsync(async (req, res, next) => {
  if (req.body.ratingsAverage || req.body.ratingsQuantity) {
    return next(new AppError('This route is not for making reviews!', 403));
  }

  if (req.body.eventOrganizer)
    return next(new AppError('This route is not for fixing yourself!', 403));

  if (req.body.priceDiscount)
    return next(new AppError('This route is not for price discounts!', 403));

  let filteredBody = filterObj(
    req.body,
    'title',
    'originalReleaseDate',
    'duration',
    'mpaaRating',
    'overview',
    'synopsis',
    'language',
    'subtitles',
    'contentType',
    'castcrew',
    'price',
    'genres',
    'specialVenue',
    'poster',
    'cloudinaryPhoto'
  );

  filteredBody = sanitize(filteredBody);
  if (req.body.cloudinaryPhoto)
    filteredBody.cloudinaryPhoto = req.body.cloudinaryPhoto;

  console.log(filteredBody);

  const updatedShow = await Show.findOneAndUpdate(
    { _id: req.params.id, eventOrganizer: req.user.id },
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      show: updatedShow
    }
  });
});

exports.getAllShows = factory.getAll(Show);
exports.getShow = factory.getOne(Show, 'reviews', 'showtimes');
exports.createShow = factory.createOne(Show);
exports.updateShow = factory.updateOne(Show);
exports.deleteShow = factory.deleteOne(Show);

exports.getShowStats = catchAsync(async (req, res, next) => {
  const stats = await Show.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$mpaaRating' },
        numShows: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Show.aggregate([
    {
      $match: {
        releaseDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$releaseDate' },
        numShowStarts: { $sum: 1 },
        shows: { $push: '$title' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numShowStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});

exports.getOriginalRelease = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const original = await Show.aggregate([
    {
      $unwind: '$originalReleaseDate'
    },
    {
      $match: {
        originalReleaseDate: {
          $gte: new Date(`${year}`),
          $lte: new Date(`${year + 10}`)
        }
      }
    },
    {
      $group: {
        _id: { $year: '$originalReleaseDate' },
        numShowsBegan: { $sum: 1 },
        shows: { $push: '$title' }
      }
    },
    {
      $addFields: { year: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { year: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      original
    }
  });
});
