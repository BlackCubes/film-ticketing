const Show = require('./../models/showModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const shows = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/shows-simple.json`)
// );

exports.aliasTopShows = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,ratingsAverage,overview,mpaaRating,duration';

  next();
};

exports.getAllShows = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.castcrewId) filter.castcrew = req.params.castcrewId;

  // EXECUTE QUERY
  const features = new APIFeatures(Show.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const shows = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: shows.length,
    data: {
      shows
    }
  });
});

exports.getShow = catchAsync(async (req, res, next) => {
  const show = await Show.findById(req.params.id).populate([
    'reviews',
    'showtimes'
  ]);

  if (!show) {
    return next(new AppError('There is no show with that ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      show
    }
  });

  // const id = req.params.id * 1;
  // const show = shows.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     show
  //   }
  // });
});

exports.createShow = catchAsync(async (req, res, next) => {
  const newShow = await Show.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      show: newShow
    }
  });

  // const newId = shows[shows.length - 1].id + 1;
  // const newShow = Object.assign({ id: newId }, req.body);

  // shows.push(newShow);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/shows-simple.json`,
  //   JSON.stringify(shows),
  //   err => {
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         shows: newShow
  //       }
  //     });
  //   }
  // );
});

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
