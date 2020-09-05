const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const photoController = require('./../controllers/photoController');
const validationController = require('./../controllers/validationController');
const showRouter = require('./showRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:userId/shows', showRouter);

router.post('/signup', authController.signup);
router.post('/login', validationController.login, authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// PROTECT ALL OTHER ROUTES LEAKING
// router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updateMyPassword
);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.patch(
  '/updateMe',
  authController.protect,
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateMe
);

router.patch(
  '/updateMe/:userPhoto',
  authController.protect,
  photoController.deletePhoto('users'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateMe
);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

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
    photoController.bufferPhoto('photo'),
    photoController.uploadPhoto('kinetotickets-users', false),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

router.patch(
  '/:id/:userPhoto',
  authController.protect,
  authController.restrictTo('admin'),
  photoController.deletePhoto('users'),
  photoController.bufferPhoto('photo'),
  photoController.uploadPhoto('kinetotickets-users', false),
  userController.updateUser
);

module.exports = router;
