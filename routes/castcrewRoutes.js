const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(castcrewConroller.getAllCastCrew);

router
  .route('/:id')
  .get(castcrewConroller.getCastCrew)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    castcrewConroller.updateCastCrew
  );

module.exports = router;
