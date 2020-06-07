const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get('/', viewsController.getHome);

// SHOW ROUTES
router.get('/shows', viewsController.getShows);
router.get('/show-overview/:slug', viewsController.getShow);

// THEATER ROUTES
router.get('/theaters', viewsController.getTheaters);
router.get('/theater-overview/:slug', viewsController.getTheater);

// CASTCREW ROUTES
router.get('/castcrew-overview/:slug', viewsController.getCastCrew);

// USER ROUTES
router.get('/login', viewsController.getLoginForm);

module.exports = router;
