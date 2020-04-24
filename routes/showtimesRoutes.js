const express = require('express');
const showtimesController = require('./../controllers/showtimesController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(showtimesController.getAllShowtimes)
  .post(
    authController.protect,
    authController.restrictTo('event-owner'),
    showtimesController.createShowtime
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('event-owner'),
    showtimesController.updateShowtime
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showtimesController.deleteShowtime
  );

module.exports = router;
