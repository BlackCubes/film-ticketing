const express = require('express');
const authController = require('./../controllers/authController');
const theaterController = require('./../controllers/theaterController');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router();

router.use('/:theaterId/showtimes', showtimeRouter);
router.use('/:theaterId/shows/:showId/showtimes', showtimeRouter);

router
  .route('/')
  .get(theaterController.getAllTheaters)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    theaterController.createTheater
  );

router
  .route('/:id')
  .get(theaterController.getTheater)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    theaterController.updateTheater
  );

module.exports = router;
