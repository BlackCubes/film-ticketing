const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multer = require('multer');
const sharp = require('sharp');
const Show = require('./../models/showModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// MULTER
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/shows');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `show-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

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

exports.uploadShowPhoto = upload.single('poster');

// exports.uploadShowPhotoPromo = upload.array('imgPromo', 5);

exports.resizeShowPhotoLarge = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const photoUserId =
    req.user.role === 'admin' ? req.body.eventOrganizer : req.user.id;

  req.file.filename = `show-${photoUserId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize({
      width: 853,
      height: 1280,
      fit: sharp.fit.contain
    })
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`public/img/shows/${req.file.filename}`);

  next();
});

exports.deletePoster = catchAsync(async (req, res, next) => {
  if (!req.params.showPoster) return next();
  if (
    req.params.showPoster.split('.')[1] !== 'jpeg' ||
    req.params.showPoster.split('-').length !== 3 ||
    req.params.showPoster.split('-')[0] !== 'show' ||
    req.params.showPoster.length !== 48
  )
    return next(new AppError('This route is for updating posters!', 400));

  const unlinkAsync = promisify(fs.unlink);
  const posterPath = path.join('public/img/shows/', req.params.showPoster);
  // const posterPath = `C:\\Users\\mrdrp\\Desktop\\output\\${req.params.showPoster}`;

  // sharp.cache(false);

  await unlinkAsync(posterPath);

  next();
});

// exports.resizeShowPhotoPromoLarge = catchAsync(async (req, res, next) => {
//   // console.log(req.files);
//   if (!req.files) return next();

//   req.body.imgpromo = [{ image: { urlLarge: '' } }];

//   await Promise.all(
//     req.files.map(async (file, i) => {
//       const filename = `show-${req.params.slug}-${Date.now()}-${i + 1}.jpeg`;

//       file.filename = filename;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`C:\\Users\\mrdrp\\Desktop\\output\\${filename}`);

//       console.log('File: ', file.filename);

//       // req.body.imgpromo.image.urlLarge = filename;
//     })
//   );

//   // console.log(this);
//   next();
// });

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.aliasTopShows = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,ratingsAverage,overview,mpaaRating,duration';

  next();
};

exports.getEventOrganizer = (req, res, next) => {
  req.body.eventOrganizer = [req.user.id];
  next();
};

exports.createMyShow = catchAsync(async (req, res, next) => {
  if (req.body.ratingsAverage || req.body.ratingsQuantity) {
    return next(new AppError('This route is not for making reviews!', 400));
  }

  const filteredBody = filterObj(
    req.body,
    'title',
    'originalReleaseDate',
    'duration',
    'mpaaRating',
    'overview',
    'synopsis',
    'language',
    'subtitles',
    'contentType',
    'castcrew',
    'price',
    'priceDiscount',
    'genres',
    'specialVenue',
    'eventOrganizer',
    'poster'
  );

  // const newShow = await Show.create(filteredBody);
  console.log('Filteredbody: ', filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      data: filteredBody
    }
  });
});

exports.updateMyShow = catchAsync(async (req, res, next) => {
  if (req.body.ratingsAverage || req.body.ratingsQuantity) {
    return next(new AppError('This route is not for making reviews!', 400));
  }

  if (req.body.eventOrganizer)
    return next(new AppError('This route is not for fixing yourself!', 400));

  if (req.body.priceDiscount)
    return next(new AppError('This route is not for price discounts!'));

  const filteredBody = filterObj(
    req.body,
    'title',
    'originalReleaseDate',
    'duration',
    'mpaaRating',
    'overview',
    'synopsis',
    'language',
    'subtitles',
    'contentType',
    'castcrew',
    'price',
    'genres',
    'specialVenue',
    'poster'
  );
  // if (req.file) filteredBody.poster = { urlLarge: req.file.filename };
  // if (req.files) {
  //   let imgpromoData = [];

  //   req.files.forEach(file => {
  //     imgpromoData = [...imgpromoData, { image: { urlLarge: file.filename } }];
  //   });

  //   filteredBody.imgpromo = imgpromoData;

  //   console.log('Image Promo Data: ', imgpromoData);
  // }

  // console.log('Filtered Body Image Promo: ', filteredBody.imgpromo);

  // })

  // const updatedShow = await Show.findOneAndUpdate(
  //   { id: req.params.id, eventOrganizer: req.user.id },
  //   filteredBody,
  //   {
  //     new: true,
  //     runValidators: true
  //   }
  // );

  res.status(200).json({
    status: 'success',
    data: {
      show: filteredBody
    }
  });
});

exports.getAllShows = factory.getAll(Show);
exports.getShow = factory.getOne(Show, 'reviews', 'showtimes');
exports.createShow = factory.createOne(Show);
exports.updateShow = factory.updateOne(Show);
exports.deleteShow = factory.deleteOne(Show);

exports.getShowStats = catchAsync(async (req, res, next) => {
  const stats = await Show.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$mpaaRating' },
        numShows: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Show.aggregate([
    {
      $match: {
        releaseDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$releaseDate' },
        numShowStarts: { $sum: 1 },
        shows: { $push: '$title' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numShowStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});

exports.getOriginalRelease = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const original = await Show.aggregate([
    {
      $unwind: '$originalReleaseDate'
    },
    {
      $match: {
        originalReleaseDate: {
          $gte: new Date(`${year}`),
          $lte: new Date(`${year + 10}`)
        }
      }
    },
    {
      $group: {
        _id: { $year: '$originalReleaseDate' },
        numShowsBegan: { $sum: 1 },
        shows: { $push: '$title' }
      }
    },
    {
      $addFields: { year: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { year: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      original
    }
  });
});

// exports.getAllShows = catchAsync(async (req, res, next) => {
//   const filter = {};
//   if (req.params.castcrewId) filter.castcrew = req.params.castcrewId;

//   // EXECUTE QUERY
//   const features = new APIFeatures(Show.find(filter), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const shows = await features.query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: shows.length,
//     data: {
//       shows
//     }
//   });
// });

// FOR WITHOUT MONGO:
// exports.checkID = (req, res, next, val) => {
//   console.log(`Show id is: ${val}`);

//   if (req.params.id * 1 > shows.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.title || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Did not put in the name or price!'
//     });
//   }
//   next();
// };
