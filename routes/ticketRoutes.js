const express = require('express');
const authController = require('./../controllers/authController');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.get(
  '/checkout-session/:showId',
  authController.protect,
  ticketController.getCheckoutSession
);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket);

router
  .route('/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
