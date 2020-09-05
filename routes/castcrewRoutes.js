const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
const showRouter = require('./showRoutes');

const router = express.Router();

router.use('/:castcrewId/shows', showRouter);

router.route('/').get(castcrewConroller.getAllCastCrew);
router.route('/:id').get(castcrewConroller.getCastCrew);

// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    photoController.bufferPhoto('photo'),
    photoController.uploadPhoto('kinetotickets-castcrews'),
    castcrewConroller.rolesParse,
    castcrewConroller.createCastCrew
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    castcrewConroller.rolesParse,
    castcrewConroller.updateCastCrew
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyPassword,
    castcrewConroller.deleteCastCrew
  );

router.patch(
  '/:id/:castcrewsPhoto',
  authController.protect,
  authController.restrictTo('admin'),
  photoController.deletePhoto('castcrews'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-castcrews'),
  castcrewConroller.updateCastCrew
);

module.exports = router;
