const express = require('express');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
const theaterController = require('./../controllers/theaterController');
const validationController = require('./../controllers/validationController');
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
// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    theaterController.geoParse,
    validationController.createTheater,
    photoController.bufferPhoto('photo'),
    photoController.uploadPhoto('kinetotickets-theaters'),
    theaterController.createTheater
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    theaterController.geoParse,
    validationController.insertParamsId,
    validationController.updateTheater,
    theaterController.updateTheater
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyPassword,
    theaterController.deleteTheater
  );

router.patch(
  '/:id/:theaterPhoto',
  authController.protect,
  authController.restrictTo('admin'),
  theaterController.geoParse,
  validationController.insertParamsId,
  validationController.updateTheater,
  photoController.bufferPhoto('photo'),
  photoController.deletePhoto('theaters'),
  photoController.uploadPhoto('kinetotickets-theaters'),
  theaterController.updateTheater
);

module.exports = router;
