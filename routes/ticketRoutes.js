const express = require('express');
const authController = require('./../controllers/authController');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.get(
  '/checkout-session/:showId',
  authController.protect,
  ticketController.getCheckoutSession
);

module.exports = router;
