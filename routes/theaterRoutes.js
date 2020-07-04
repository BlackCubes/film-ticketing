const express = require('express');
const authController = require('./../controllers/authController');
const theaterController = require('./../controllers/theaterController');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router();

router.use('/:theaterId/showtimes', showtimeRouter);
router.use('/:theaterId/shows/:showId/showtimes', showtimeRouter);

router
  .route('/theaters-within/:distance/center/:latlng/unit/:unit')
  .get(theaterController.getTheatersWithin);

router
  .route('/distances/:latlng/unit/:unit')
  .get(theaterController.getDistances);

router.route('/').get(theaterController.getAllTheaters);
router.route('/:id').get(theaterController.getTheater);

// PROTECT ALL OTHER ROUTES LEAKING AND RESTRICT ONLY TO ADMINS
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    theaterController.uploadTheaterPhotos,
    theaterController.resizeTheaterPhotos,
    theaterController.geoParse,
    theaterController.createTheater
  );

router
  .route('/:id')
  .patch(theaterController.geoParse, theaterController.updateTheater)
  .delete(authController.verifyPassword, theaterController.deleteTheater);

router.patch(
  '/:id/:photo',
  theaterController.deletePhoto,
  theaterController.uploadTheaterPhoto,
  theaterController.resizeTheaterPhoto,
  theaterController.updateTheater
);

module.exports = router;
