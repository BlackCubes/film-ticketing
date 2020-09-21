const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get(
  '/',
  // ticketController.createTicketCheckout,
  authController.isLoggedIn,
  viewsController.getHome
);

router.get('/no-javascript', viewsController.getNoJS);

// SHOW ROUTES
router.get('/shows', authController.isLoggedIn, viewsController.getShows);
router.get(
  '/show-overview/:slug',
  authController.isLoggedIn,
  viewsController.getShow
);
router.get(
  '/special-venues',
  authController.isLoggedIn,
  viewsController.getSpecialVenues
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
router.get('/login', authController.checkLogin, viewsController.getLoginForm);
router.get(
  '/register',
  authController.checkLogin,
  viewsController.getRegisterForm
);
router.get(
  '/forgotPassword',
  authController.checkLogin,
  viewsController.getForgotPasswordForm
);
router.get(
  '/resetPassword/:token',
  authController.checkLogin,
  viewsController.getResetPasswordForm
);
router.get(
  '/me',
  authController.protect,
  authController.restrictTo('user', 'event-owner', 'admin'),
  viewsController.getAccount
);
router.get(
  '/myTickets',
  authController.protect,
  authController.restrictTo('user', 'admin'),
  viewsController.getMyTickets
);
router.get(
  '/myReviews',
  authController.protect,
  authController.restrictTo('user', 'admin'),
  viewsController.getMyReviews
);
router.get(
  '/myReviews/:slug',
  authController.protect,
  authController.restrictTo('user', 'admin'),
  viewsController.getMyReviewForm
);

// -- EVENT OWNER ROUTES
router.get(
  '/createMyShow',
  authController.protect,
  authController.restrictTo('event-owner', 'admin'),
  viewsController.getEventOwnerCreateShow
);

router.get(
  '/myShows',
  authController.protect,
  authController.restrictTo('event-owner', 'admin'),
  viewsController.getEventOwnerGetShows
);

router.get(
  '/myShows/:slug',
  authController.protect,
  authController.restrictTo('event-owner', 'admin'),
  viewsController.getEventOwnerShow
);

router.get(
  '/myShowsReviews',
  authController.protect,
  authController.restrictTo('event-owner', 'admin'),
  viewsController.getEventOwnerShowsReviews
);

router.get(
  '/myShowsReviews/:slug',
  authController.protect,
  authController.restrictTo('event-owner', 'admin'),
  viewsController.getEventOwnerShowReviews
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
  '/admin/users/:id/reviews',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminUserReviews
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
  '/admin/shows/:id/reviews',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShowReviews
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

router.get(
  '/admin/showtimes-options',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShowtimeOptions
);
router.get(
  '/admin/showtimes',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShowtimes
);
router.get(
  '/admin/showtimes/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminShowtime
);
router.get(
  '/admin/create-showtime',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCreateShowtime
);

router.get(
  '/admin/castcrew-options',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCastCrewOptions
);
router.get(
  '/admin/castcrews',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCastCrews
);
router.get(
  '/admin/castcrews/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCastCrew
);
router.get(
  '/admin/create-castcrew',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getAdminCreateCastCrew
);

module.exports = router;
