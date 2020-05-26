const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get('/', viewsController.getHome);
router.get('/shows', viewsController.getShows);
router.get('/show-overview', viewsController.getShow);

module.exports = router;
