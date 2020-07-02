const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multer = require('multer');
const sharp = require('sharp');
const CastCrew = require('./../models/castcrewModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('This is not an image! Please upload only images!', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadCastCrewPhoto = upload.single('photo');

exports.resizeCastCrewPhotoLarge = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `castcrew-${req.user.id}-${Date.now()}.jpeg`;
  req.body.photo = { urlLarge: req.file.filename };

  await sharp(req.file.buffer)
    .resize(900, 900)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`public/img/castcrew/${req.file.filename}`);

  next();
});

// exports.deletePoster = catchAsync(async (req, res, next) => {
//   if (!req.params.showPoster) return next();
//   if (
//     req.params.showPoster.split('.')[1] !== 'jpeg' ||
//     req.params.showPoster.split('-').length !== 3 ||
//     req.params.showPoster.split('-')[0] !== 'show' ||
//     req.params.showPoster.length !== 48
//   )
//     return next(new AppError('This route is for updating posters!', 400));

//   const unlinkAsync = promisify(fs.unlink);
//   const posterPath = path.join('public/img/shows/', req.params.showPoster);
//   // const posterPath = `C:\\Users\\mrdrp\\Desktop\\output\\${req.params.showPoster}`;

//   // sharp.cache(false);

//   await unlinkAsync(posterPath);

//   next();
// });

exports.getAllCastCrew = factory.getAll(CastCrew);
exports.getCastCrew = factory.getOne(CastCrew, 'shows');
exports.createCastCrew = factory.createOne(CastCrew);
exports.updateCastCrew = factory.updateOne(CastCrew);
exports.deleteCastCrew = factory.deleteOne(CastCrew);

// exports.getAllCastCrew = catchAsync(async (req, res, next) => {
//   const castcrews = await CastCrew.find();

//   res.status(200).json({
//     status: 'success',
//     results: castcrews.length,
//     data: {
//       castcrews
//     }
//   });
// });

// exports.getCastCrew = catchAsync(async (req, res, next) => {
//   const castcrew = await CastCrew.findById(req.params.id);

//   if (!castcrew) {
//     return next(new AppError('There is no cast/crew with that id!', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       castcrew
//     }
//   });
// });

// exports.createCastCrew = catchAsync(async (req, res, next) => {
//   const newCastCrew = await CastCrew.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       castcrew: newCastCrew
//     }
//   });
// });

// exports.updateCastCrew = catchAsync(async (req, res, next) => {
//   const castcrew = await CastCrew.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   if (!castcrew) {
//     return next(new AppError('There is no cast/crew with that id!', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       castcrew
//     }
//   });
// });

// exports.deleteCastCrew = catchAsync(async (req, res, next) => {
//   const castcrew = await CastCrew.findByIdAndDelete(req.params.id);

//   if (!castcrew) {
//     return next(new AppError('There is no cast/crew with that id!', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });
