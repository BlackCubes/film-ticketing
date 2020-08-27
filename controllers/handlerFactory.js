const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('There is no document with that ID!', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    if (req.file && req.params.showPoster)
      req.body.poster = { urlLarge: req.file.filename };

    // const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    // if (!doc) {
    //   return next(new AppError('There is no document with that ID!', 404));
    // }
    console.log(`Model: ${Model}`); // Delete!

    res.status(200).json({
      status: 'success',
      data: {
        data: 'This is test! When done, uncomment!'
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    // if (req.file) req.body.poster = { urlLarge: req.file.filename };

    // const doc = await Model.create(req.body);
    console.log(`Model: ${Model}`); // Delete!

    res.status(201).json({
      status: 'success',
      data: {
        data: 'This is test for cloudinary! When done, uncomment!'
      }
    });
  });

exports.getOne = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('There is no document with that ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // Nested routes, need to fix
    const filter = {};
    if (req.params.castcrewId) filter.castcrew = req.params.castcrewId;
    if (req.params.showId && Model === 'Review')
      filter.show = req.params.showId;
    if (req.params.showId && Model === 'Showtimes')
      filter.shows = req.params.showId;
    if (req.params.theaterId) filter.theaters = req.params.theaterId;
    if (req.params.userId) filter.eventOrganizer = req.params.userId;

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
