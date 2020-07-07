const express = require('express');
const showtimesController = require('./../controllers/showtimesController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(showtimesController.getAllShowtimes);
router.route('/:id').get(showtimesController.getShowtime);
router.route('/daily-plan/:date').get(showtimesController.getDailyPlan);

// PROTECT ALL OTHER ROUTES LEAKING
router.use(authController.protect);

router
  .route('/createMyShowtime')
  .post(
    authController.restrictTo('event-owner'),
    showtimesController.createMyShowtime
  );

router
  .route('/')
  .post(
    authController.restrictTo('admin'),
    showtimesController.setShowTheaterIds,
    showtimesController.createShowtime
  );

router
  .route('/:id')
  .patch(
    authController.restrictTo('admin', 'event-owner'),
    showtimesController.updateShowtime
  )
  .delete(
    authController.restrictTo('admin', 'event-owner'),
    showtimesController.deleteShowtime
  );

module.exports = router;
