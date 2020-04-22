const express = require('express');
const castcrewConroller = require('./../controllers/castcrewController');

const router = express.Router();

router.route('/').get(castcrewConroller.getAllCastCrew);

module.exports = router;
