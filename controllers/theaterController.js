const Theater = require('./../models/theaterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTheaters = catchAsync(async (req, res, next) {
  const theaters = await Theater.find();

  res.status(200).json({
    status: 'success',
    results: theaters.length,
    data: {
      theaters
    }
  })
});