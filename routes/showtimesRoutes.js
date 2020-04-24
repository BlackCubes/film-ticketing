const express = require('express');
const showtimesController = require('./../controllers/showtimesController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(showtimesController.getAllShowtimes)
  .post(
    authController.protect,
    authController.restrictTo('event-owner'),
    showtimesController.createShowtime
  );

module.exports = router;
