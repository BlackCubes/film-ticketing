const express = require('express');
const theaterController = require('./../controllers/theaterController');

const router = express.Router();

router.route('/').get(theaterController.getAllTheaters);

router.route('/:id').get(theaterController.getTheater);

module.exports = router;
