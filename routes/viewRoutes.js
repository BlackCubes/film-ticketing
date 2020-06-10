const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);

// SHOW ROUTES
router.get('/shows', viewsController.getShows);
router.get('/show-overview/:slug', viewsController.getShow);

// THEATER ROUTES
router.get('/theaters', viewsController.getTheaters);
router.get('/theater-overview/:slug', viewsController.getTheater);

// CASTCREW ROUTES
router.get('/castcrew-overview/:slug', viewsController.getCastCrew);

// USER ROUTES
router.get('/login', viewsController.getLoginForm);
router.get('/register', viewsController.getRegisterForm);
router.get('/me', viewsController.getAccount);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);

module.exports = router;
