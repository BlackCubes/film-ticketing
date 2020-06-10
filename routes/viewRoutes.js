const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get('/', authController.isLoggedIn, viewsController.getHome);

// SHOW ROUTES
router.get('/shows', authController.isLoggedIn, viewsController.getShows);
router.get(
  '/show-overview/:slug',
  authController.isLoggedIn,
  viewsController.getShow
);

// THEATER ROUTES
router.get('/theaters', authController.isLoggedIn, viewsController.getTheaters);
router.get(
  '/theater-overview/:slug',
  authController.isLoggedIn,
  viewsController.getTheater
);

// CASTCREW ROUTES
router.get(
  '/castcrew-overview/:slug',
  authController.isLoggedIn,
  viewsController.getCastCrew
);

// USER ROUTES
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/register',
  authController.isLoggedIn,
  viewsController.getRegisterForm
);
router.get('/me', viewsController.getAccount);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.getForgotPasswordForm
);

module.exports = router;
