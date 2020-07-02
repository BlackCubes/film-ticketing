const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');
const showRouter = require('./showRoutes');

const router = express.Router();

router.use('/:castcrewId/shows', showRouter);

router.route('/').get(castcrewConroller.getAllCastCrew);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    castcrewConroller.updateCastCrew,
    castcrewConroller.resizeCastCrewPhotoLarge,
    castcrewConroller.rolesParse,
    castcrewConroller.createCastCrew
  );

router
  .route('/:id')
  .get(castcrewConroller.getCastCrew)
  .patch(castcrewConroller.updateCastCrew)
  .delete(castcrewConroller.deleteCastCrew);

module.exports = router;
