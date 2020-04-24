const Showtimes = require('./../models/showtimesModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllShowtimes = catchAsync(async (req, res, next) => {
  const showtimes = await Showtimes.find();

  res.status(200).json({
    status: 'success',
    results: showtimes.length,
    data: {
      showtimes
    }
  });
});

exports.createShowtime = catchAsync(async (req, res, next) => {
  if (!req.body.shows) req.body.shows.push(req.params.showId);
  if (!req.body.theaters) req.body.theaters.push(req.params.theaterId);

  const newShowtime = await Showtimes.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      showtime: newShowtime
    }
  });
});
