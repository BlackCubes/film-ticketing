const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
const validationController = require('./../controllers/validationController');
const showRouter = require('./showRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:userId/shows', showRouter);

router.post(
  '/signup',
  authController.checkLogin,
  validationController.insertPasswordConfirm,
  validationController.signup,
  authController.signup
);
router.post(
  '/login',
  authController.checkLogin,
  validationController.login,
  authController.login
);
router.get('/logout', authController.logout);
router.post(
  '/forgotPassword',
  authController.checkLogin,
  validationController.forgotPass,
  authController.forgotPassword
);
router.patch(
  '/resetPassword/:token',
  authController.checkLogin,
  validationController.insertPasswordConfirm,
  validationController.resetPass,
  authController.resetPassword
);

// PROTECT ALL OTHER ROUTES LEAKING
// router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  authController.protect,
  validationController.insertPasswordConfirm,
  validationController.updatePass,
  authController.updateMyPassword
);

router.get(
  '/me',
  authController.protect,
  authController.restrictTo('users', 'event-owner', 'admin'),
  userController.getMe,
  userController.getUser
);

router.patch(
  '/updateMe',
  authController.protect,
  authController.restrictTo('users', 'event-owner', 'admin'),
  validationController.updateUser,
  photoController.checkPhotoUpload('User'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateMe
);

router.patch(
  '/updateMe/:userPhoto',
  authController.protect,
  authController.restrictTo('users', 'event-owner', 'admin'),
  validationController.updateUser,
  photoController.checkPhotoUpload('User'),
  photoController.bufferPhoto('photo'),
  photoController.deletePhoto('users'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateMe
);

router.delete(
  '/deleteMe',
  authController.protect,
  authController.restrictTo('user', 'event-owner'),
  authController.verifyPassword,
  userController.deleteMe
);
router.delete(
  '/deleteMe/:id',
  authController.protect,
  authController.restrictTo('admin'),
  authController.verifyPassword,
  userController.deleteMe
);

// RESTRICT ROUTES ONLY TO ADMINS
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.createUser
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validationController.updateUser,
    photoController.bufferPhoto('photo'),
    photoController.uploadPhoto('kinetotickets-users', false),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyPassword,
    userController.deleteUser
  );

router.patch(
  '/:id/:userPhoto',
  authController.protect,
  authController.restrictTo('admin'),
  validationController.updateUser,
  photoController.bufferPhoto('photo'),
  photoController.deletePhoto('users'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateUser
);

module.exports = router;
