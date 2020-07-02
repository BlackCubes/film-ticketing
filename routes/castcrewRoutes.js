const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');
const showRouter = require('./showRoutes');

const router = express.Router();

router.use('/:castcrewId/shows', showRouter);

router
  .route('/')
  .get(castcrewConroller.getAllCastCrew)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    castcrewConroller.updateCastCrew,
    castcrewConroller.resizeCastCrewPhotoLarge,
    castcrewConroller.rolesParse,
    castcrewConroller.createCastCrew
  );

router
  .route('/:id')
  .get(castcrewConroller.getCastCrew)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    castcrewConroller.updateCastCrew
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    castcrewConroller.deleteCastCrew
  );

module.exports = router;
