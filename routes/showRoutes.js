const express = require('express');
const reviewController = require('./../controllers/reviewController');
const showController = require('./../controllers/showController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', showController.checkID);

router
  .route('/top-5-shows')
  .get(showController.aliasTopShows, showController.getAllShows);

router.route('/show-stats').get(showController.getShowStats);
router.route('/monthly-plan/:year').get(showController.getMonthlyPlan);
router.route('/original-release/:year').get(showController.getOriginalRelease);

router
  .route('/')
  .get(authController.protect, showController.getAllShows)
  .post(showController.createShow);

router
  .route('/:id')
  .get(showController.getShow)
  .patch(showController.updateShow)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.deleteShow
  );

router
  .route('/:showId/reviews')
  .post(authController.protect, authController.restrictTo('user'));

module.exports = router;
