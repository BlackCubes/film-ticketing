const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
const showRouter = require('./showRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:userId/shows', showRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// PROTECT ALL OTHER ROUTES LEAKING
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updateMyPassword);

router.get('/me', userController.getMe, userController.getUser);

router.patch('/updateMe', userController.updateMe);

router.patch(
  '/updateMe/:userPhoto',
  photoController.deletePhoto('users'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users'),
  userController.updateMe
);

router.delete('/deleteMe', userController.deleteMe);

// RESTRICT ROUTES ONLY TO ADMINS
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.patch(
  '/:id/:userPhoto',
  photoController.deletePhoto('users'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users'),
  userController.updateUser
);

module.exports = router;
