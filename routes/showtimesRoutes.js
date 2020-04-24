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

module.exports = router;
