const express = require('express');
const theaterController = require('./../controllers/theaterController');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router();

router.use('/:theaterId/showtimes', showtimeRouter);
router.use('/:theaterId/shows/:showId/showtimes', showtimeRouter);

router.route('/').get(theaterController.getAllTheaters);

router.route('/:id').get(theaterController.getTheater);

module.exports = router;
