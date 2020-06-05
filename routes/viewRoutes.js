const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

// SHOW ROUTES
router.get('/', viewsController.getHome);
router.get('/shows', viewsController.getShows);
router.get('/show-overview/:slug', viewsController.getShow);

// THEATER ROUTES
router.get('/theater-overview/:slug', viewsController.getTheater);

module.exports = router;
