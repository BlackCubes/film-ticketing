const CastCrew = require('./../models/castcrewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllCastCrew = catchAsync(async (req, res, next) => {
  const castcrews = await CastCrew.find();

  res.status(200).json({
    status: 'success',
    results: castcrews.length,
    data: {
      castcrews
    }
  });
});
