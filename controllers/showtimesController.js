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
