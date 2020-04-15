const express = require('express');
const showController = require('./../controllers/showController');

const router = express.Router();

// router.param('id', showController.checkID);

router
  .route('/top-5-shows')
  .get(showController.aliasTopShows, showController.getAllShows);

router.route('/show-stats').get(showController.getShowStats);

router
  .route('/')
  .get(showController.getAllShows)
  .post(showController.createShow);

router
  .route('/:id')
  .get(showController.getShow)
  .patch(showController.updateShow)
  .delete(showController.deleteShow);

module.exports = router;
