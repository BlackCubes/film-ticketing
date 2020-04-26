const express = require('express');
const showController = require('./../controllers/showController');
const authController = require('./../controllers/authController');
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

router
  .route('/')
  .get(showController.getAllShows)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.createShow
  );

router
  .route('/:id')
  .get(showController.getShow)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.updateShow
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.deleteShow
  );

module.exports = router;
