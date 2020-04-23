const CastCrew = require('./../models/castcrewModel');
const AppError = require('./../utils/appError');
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

exports.getCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findById(req.params.id);

  if (!castcrew) {
    return next(new AppError('There is no cast/crew with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      castcrew
    }
  });
});

exports.createCastCrew = catchAsync(async (req, res, next) => {
  const newCastCrew = await CastCrew.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      castcrew: newCastCrew
    }
  });
});

exports.updateCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!castcrew) {
    return next(new AppError('There is no cast/crew with that id!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      castcrew
    }
  });
});

exports.deleteCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findByIdAndDelete(req.params.id);

  if (!castcrew) {
    return next(new AppError('There is no cast/crew with that id!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
