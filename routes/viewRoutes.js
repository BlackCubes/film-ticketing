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
router.get(
  '/login',
  authController.isLoggedIn,
  authController.checkLogin,
  viewsController.getLoginForm
);
router.get(
  '/register',
  authController.isLoggedIn,
  authController.checkLogin,
  viewsController.getRegisterForm
);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  authController.checkLogin,
  viewsController.getForgotPasswordForm
);
router.get('/me', authController.protect, viewsController.getAccount);
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

// ADMIN ROUTES
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/admin', viewsController.getAdminPage);
router.get('/admin/user-options', viewsController.getAdminUserOptions);
router.get('/admin/users', viewsController.getAdminUsers);
router.get('/admin/users/:id', viewsController.getAdminUser);
router.get('/admin/users/:id/shows', viewsController.getAdminUserShows);
router.get('/admin/users/:id/reviews', viewsController.getAdminUserReviews);

router.get('/admin/show-options', viewsController.getAdminShowOptions);
router.get('/admin/shows', viewsController.getAdminShows);
router.get('/admin/shows/:id', viewsController.getAdminShow);
router.get('/admin/shows/:id/reviews', viewsController.getAdminShowReviews);
router.get('/admin/create-show', viewsController.getAdminCreateShow);

router.get('/admin/theater-options', viewsController.getAdminTheaterOptions);
router.get('/admin/theaters', viewsController.getAdminTheaters);
router.get('/admin/theaters/:id', viewsController.getAdminTheater);
router.get('/admin/create-theater', viewsController.getAdminCreateTheater);

router.get('/admin/showtimes-options', viewsController.getAdminShowtimeOptions);
router.get('/admin/showtimes', viewsController.getAdminShowtimes);
router.get('/admin/showtimes/:id', viewsController.getAdminShowtime);
router.get('/admin/create-showtime', viewsController.getAdminCreateShowtime);

router.get('/admin/castcrew-options', viewsController.getAdminCastCrewOptions);
router.get('/admin/castcrews', viewsController.getAdminCastCrews);
router.get('/admin/castcrews/:id', viewsController.getAdminCastCrew);
router.get('/admin/create-castcrew', viewsController.getAdminCreateCastCrew);

module.exports = router;
