const Theater = require('./../models/theaterModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTheaters = catchAsync(async (req, res, next) => {
  const theaters = await Theater.find();

  res.status(200).json({
    status: 'success',
    results: theaters.length,
    data: {
      theaters
    }
  });
});

exports.getTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findById(req.params.id).populate('showtimes');

  if (!theater) {
    return next(new AppError('There is no theater with that ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      theater
    }
  });
});

exports.createTheater = catchAsync(async (req, res, next) => {
  const newTheater = await Theater.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      theater: newTheater
    }
  });
});

exports.updateTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!theater) {
    return next(new AppError('There is no theater with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      theater
    }
  });
});
