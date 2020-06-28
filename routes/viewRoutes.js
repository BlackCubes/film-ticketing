const express = require('express');
const authController = require('./../controllers/authController');
const ticketController = require('./../controllers/ticketController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get(
  '/',
  ticketController.createTicketCheckout,
  authController.isLoggedIn,
  viewsController.getHome
);

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
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.getForgotPasswordForm
);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/myTickets', authController.protect, viewsController.getMyTickets);
router.get('/myReviews', authController.protect, viewsController.getMyReviews);
router.get(
  '/myReviews/:slug',
  authController.protect,
  viewsController.getMyReviewForm
);

// -- EVENT OWNER ROUTES
router.get(
  '/createMyShow',
  authController.protect,
  viewsController.getEventOwnerCreateShow
);

router.get(
  '/myShows',
  authController.protect,
  viewsController.getEventOwnerGetShows
);

router.get(
  '/myShows/:slug',
  authController.protect,
  viewsController.getEventOwnerShow
);

// ADMIN ROUTES
router.get(
  '/admin',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminPage
);
router.get(
  '/admin/user-options',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminUserOptions
);
router.get(
  '/admin/users',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminUsers
);
router.get(
  '/admin/users/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminUser
);
router.get(
  '/admin/users/:id/shows',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminUserShows
);

router.get(
  '/admin/show-options',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShowOptions
);
router.get(
  '/admin/shows',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShows
);
router.get(
  '/admin/shows/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShow
);
router.get(
  '/admin/create-show',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCreateShow
);

router.get(
  '/admin/theater-options',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminTheaterOptions
);
router.get(
  '/admin/theaters',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminTheaters
);
router.get(
  '/admin/theaters/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminTheater
);
router.get(
  '/admin/create-theater',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCreateTheater
);

module.exports = router;
