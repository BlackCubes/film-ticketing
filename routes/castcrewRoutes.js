const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');
const showRouter = require('./showRoutes');

const router = express.Router();

router.use('/:castcrewId/shows', showRouter);

router.route('/').get(castcrewConroller.getAllCastCrew);
router.route('/:id').get(castcrewConroller.getCastCrew);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    castcrewConroller.uploadCastCrewPhoto,
    castcrewConroller.resizeCastCrewPhotoLarge,
    castcrewConroller.rolesParse,
    castcrewConroller.createCastCrew
  );

router
  .route('/:id')
  .patch(castcrewConroller.updateCastCrew)
  .delete(castcrewConroller.deleteCastCrew);

module.exports = router;
