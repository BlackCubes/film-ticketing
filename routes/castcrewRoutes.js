const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
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
    photoController.bufferPhoto('photo'),
    photoController.uploadPhoto('kinetotickets-castcrews'),
    castcrewConroller.rolesParse,
    castcrewConroller.createCastCrew
  );

router
  .route('/:id')
  .patch(castcrewConroller.rolesParse, castcrewConroller.updateCastCrew)
  .delete(authController.verifyPassword, castcrewConroller.deleteCastCrew);

router.patch(
  '/:id/:castcrewsPhoto',
  photoController.deletePhoto('castcrews'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-castcrews'),
  castcrewConroller.updateCastCrew
);

module.exports = router;
