const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const showController = require('./../controllers/showController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use('/:castcrewId/shows', showController);

router
  .route('/')
  .get(castcrewConroller.getAllCastCrew)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
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
