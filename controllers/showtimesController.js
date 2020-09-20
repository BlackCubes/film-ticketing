const Showtimes = require('./../models/showtimesModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const filterObj = require('./../utils/filterObject');
const sanitize = require('./../utils/sanitize');

exports.setShowTheaterIds = (req, res, next) => {
  if (!req.body.shows) req.body.shows = req.params.showId; // Array??
  if (!req.body.theaters) req.body.theaters = req.params.theaterId; // Array??
  next();
};

exports.checkExpired = catchAsync(async (req, res, next) => {
  const showtimesExpired = await Showtimes.valueExists({
    shows: req.params.showId,
    theaters: req.params.theaterId,
    _id: req.params.showtimeId
  });

  if (showtimesExpired && Date.now() >= showtimesExpired.startDateTime)
    return next(new AppError('This show has been expired.', 403));

  next();
});

exports.checkSoldOut = catchAsync(async (req, res, next) => {
  const showtimesSoldOut = await Showtimes.valueExists({
    shows: req.params.showId,
    theaters: req.params.theaterId,
    _id: req.params.showtimeId
  });

  if (showtimesSoldOut && showtimesSoldOut.soldOut)
    return next(new AppError('This show has been sold out.', 403));

  next();
});

exports.createMyShowtime = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(
    req.body,
    'startDateTime',
    'endDateTime',
    'shows',
    'theaters'
  );

  filteredBody = sanitize(filteredBody);

  const newShowtime = await Showtimes.create(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      data: newShowtime
    }
  });
});

exports.getAllShowtimes = factory.getAll(Showtimes);
exports.getShowtime = factory.getOne(Showtimes);
exports.createShowtime = factory.createOne(Showtimes);
exports.updateShowtime = factory.updateOne(Showtimes);
exports.deleteShowtime = factory.deleteOne(Showtimes);

exports.getDailyPlan = catchAsync(async (req, res, next) => {
  const { date } = req.params;

  const plan = await Showtimes.aggregate([
    {
      $unwind: '$shows'
    },
    {
      $lookup: {
        from: 'shows',
        localField: 'shows',
        foreignField: '_id',
        as: 'show'
      }
    },
    {
      $unwind: '$theaters'
    },
    {
      $lookup: {
        from: 'theaters',
        localField: 'theaters',
        foreignField: '_id',
        as: 'theater'
      }
    },
    {
      $unwind: '$show'
    },
    {
      $unwind: '$theater'
    },
    {
      $match: {
        startDateTime: {
          $gte: new Date(new Date(date).setHours(00, 00, 00))
          //$lt: new Date(new Date(date).setHours(23, 59, 59))
        }
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: '$startDateTime' },
        numShows: { $sum: 1 },
        show: { $push: '$show' },
        theater: { $push: '$theater' }
      }
    },
    {
      $addFields: { dayOfWeek: '$_id' }
    },
    {
      $project: {
        'show.originalReleaseDate': 0,
        'show.castcrew': 0,
        'show.genres': 0,
        'show.imgpromo': 0,
        'show.createdAt': 0,
        'show.secretShow': 0,
        'show.eventOrganizer': 0,
        'show.overview': 0,
        'show.synopsis': 0,
        'show.language': 0,
        'show.subtitles': 0,
        'show.slug': 0,
        'show.__v': 0,
        'theater.description': 0,
        'theater.chainName': 0,
        'theater.chainCode': 0,
        'theater.chainLogo': 0,
        'theater.linkUrl': 0,
        'theater.photo': 0,
        'theater.__v': 0,
        'theater.phone': 0
      }
    },
    {
      $sort: { numShowStarts: -1 }
    },
    {
      $limit: 7
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});
