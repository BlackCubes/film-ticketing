const express = require('express');
const authController = require('./../controllers/authController');
const showtimesController = require('./../controllers/showtimesController');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.get(
  '/checkout-session/:showId/:theaterId/:showtimeId',
  authController.protect,
  authController.restrictTo('admin', 'user'),
  showtimesController.checkSoldOut,
  ticketController.checkTicketExists,
  ticketController.getCheckoutSession
);

// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.getAllTickets
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.createTicket
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.getTicket
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.updateTicket
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.deleteTicket
  );

module.exports = router;
