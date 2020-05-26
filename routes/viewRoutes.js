const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base');
// });

router.get('/', viewsController.getHome);
router.get('/show', viewsController.getShow);

module.exports = router;
