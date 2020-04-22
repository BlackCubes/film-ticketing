const express = require('express');
const showtimesController = require('./../controllers/showtimesController');

const router = express.Router();

router.route('/').get(showtimesController.getAllShowtimes);

module.exports = router;
