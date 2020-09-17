const factory = require('./handlerFactory');
const Show = require('./../models/showModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
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
  const shows = await Show.find({ eventOrganizer: req.user.id }).select(
    '+createdAt'
  );

  const createdAt = shows.map(el => el.createdAt);
  const checkDate = createdAt.forEach(date => {
    const currentDate = new Date();
    const pastDate = currentDate.setDate(currentDate.getDate() - 14);

    console.log('Past date: ', new Date(pastDate).toISOString());
    if (date < pastDate) return true;
    return false;
  });

  console.log('Check date truthy', checkDate);

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

  // const newShow = await Show.create(filteredBody);
  console.log('Filteredbody: ', filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      data: filteredBody
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
  // if (req.file) filteredBody.poster = { urlLarge: req.file.filename };
  // if (req.files) {
  //   let imgpromoData = [];

  //   req.files.forEach(file => {
  //     imgpromoData = [...imgpromoData, { image: { urlLarge: file.filename } }];
  //   });

  //   filteredBody.imgpromo = imgpromoData;

  //   console.log('Image Promo Data: ', imgpromoData);
  // }

  // console.log('Filtered Body Image Promo: ', filteredBody.imgpromo);

  // })

  // const updatedShow = await Show.findOneAndUpdate(
  //   { id: req.params.id, eventOrganizer: req.user.id },
  //   filteredBody,
  //   {
  //     new: true,
  //     runValidators: true
  //   }
  // );

  filteredBody = sanitize(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      show: filteredBody
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

// exports.getAllShows = catchAsync(async (req, res, next) => {
//   const filter = {};
//   if (req.params.castcrewId) filter.castcrew = req.params.castcrewId;

//   // EXECUTE QUERY
//   const features = new APIFeatures(Show.find(filter), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const shows = await features.query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: shows.length,
//     data: {
//       shows
//     }
//   });
// });

// FOR WITHOUT MONGO:
// exports.checkID = (req, res, next, val) => {
//   console.log(`Show id is: ${val}`);

//   if (req.params.id * 1 > shows.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.title || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Did not put in the name or price!'
//     });
//   }
//   next();
// };
