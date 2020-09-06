const express = require('express');
const photoController = require('./../controllers/photoController');
const showController = require('./../controllers/showController');
const authController = require('./../controllers/authController');
const validationController = require('./../controllers/validationController');
const castcrewRouter = require('./castcrewRoutes');
const reviewRouter = require('./reviewRoutes');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router({ mergeParams: true });

// router.param('id', showController.checkID);

router.use('/:showId/reviews', reviewRouter);
// router.use('/:showId/castcrews', castcrewRouter);
router.use('/:showId/showtimes', showtimeRouter);
router.use('/:showId/theaters/:theaterId/showtimes', showtimeRouter);

router
  .route('/top-5-shows')
  .get(showController.aliasTopShows, showController.getAllShows);

router.route('/show-stats').get(showController.getShowStats);
router.route('/original-release/:year').get(showController.getOriginalRelease);

router.route('/').get(showController.getAllShows);
router.route('/:id').get(showController.getShow);

// PROTECT ALL OTHER ROUTES LEAKING
// router.use(authController.protect);

// router.get(
//   '/getMyShows',
//   authController.restrictTo('event-owner'),
//   showController.getMyShows
// );

router.post(
  '/createMyShow',
  authController.protect,
  authController.restrictTo('event-owner'),
  validationController.createShow,
  photoController.bufferPhoto('poster'),
  photoController.uploadPhoto('kinetotickets-shows'),
  showController.getEventOrganizer,
  showController.createMyShow
);

router.patch(
  '/updateMyShow/:id',
  authController.protect,
  authController.restrictTo('event-owner'),
  validationController.insertParamsId,
  validationController.updateShow,
  showController.updateMyShow
);

router.patch(
  '/updateMyShow/:id/:showPoster',
  authController.protect,
  authController.restrictTo('event-owner'),
  validationController.insertParamsId,
  validationController.updateShow,
  photoController.deletePhoto('shows'),
  photoController.bufferPhoto('poster'),
  photoController.uploadPhoto('kinetotickets-shows'),
  showController.updateMyShow
);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.createShow,
    photoController.bufferPhoto('poster'),
    photoController.uploadPhoto('kinetotickets-shows'),
    showController.createShow
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.insertParamsId,
    validationController.updateShow,
    showController.updateShow
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyPassword,
    showController.deleteShow
  );

router.patch(
  '/:id/:showPoster',
  authController.protect,
  authController.restrictTo('admin'),
  validationController.insertParamsId,
  validationController.updateShow,
  photoController.deletePhoto('shows'),
  photoController.bufferPhoto('poster'),
  photoController.uploadPhoto('kinetotickets-shows'),
  showController.updateShow
);

router
  .route('/:userId')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    showController.getAllShows
  );

module.exports = router;
