const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

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
