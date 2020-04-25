const Showtimes = require('./../models/showtimesModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllShowtimes = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.showId) filter.shows = req.params.showId;
  if (req.params.theaterId) filter.theaters = req.params.theaterId;

  const showtimes = await Showtimes.find(filter);

  res.status(200).json({
    status: 'success',
    results: showtimes.length,
    data: {
      showtimes
    }
  });
});

exports.getShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtimes.findById(req.params.id);

  if (!showtime) {
    return next(new AppError('There is no showtime with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      showtime
    }
  });
});

exports.createShowtime = catchAsync(async (req, res, next) => {
  // LATER, CREATE CODE TO CHECK TO SEE IF DATA EXISTS, AND IF SO, THEN ERROR
  if (!req.body.shows) req.body.shows = [req.params.showId];
  if (!req.body.theaters) req.body.theaters = [req.params.theaterId];

  const newShowtime = await Showtimes.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      showtime: newShowtime
    }
  });
});

exports.updateShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtimes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!showtime) {
    return next(new AppError('There is no showtime with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      showtime
    }
  });
});

exports.deleteShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtimes.findByIdAndDelete(req.params.id);

  if (!showtime) {
    return next(new AppError('There is no showtime with that id!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getDailyPlan = catchAsync(async (req, res, next) => {
  const { date } = req.params;
  console.log(date);

  const plan = await Showtimes.aggregate([
    {
      $unwind: '$shows'
    },
    {
      $lookup: {
        from: 'Show',
        localField: 'shows',
        foreignField: '_id',
        as: 'show'
      }
    },
    {
      $unwind: '$theaters'
    },
    {
      $match: {
        startDateTime: {
          $gte: new Date(new Date(date).setHours(00, 00, 00)),
          $lt: new Date(new Date(date).setHours(23, 59, 59))
        }
      }
    },
    {
      $group: {
        _id: { $dayOfWeek: '$startDateTime' },
        numShowStarts: { $sum: 1 },
        show: { $push: '$show' },
        theaters: { $push: '$theaters' }
      }
    },
    {
      $addFields: { dayOfWeek: '$_id' }
    },
    {
      $project: { _id: 0 }
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
