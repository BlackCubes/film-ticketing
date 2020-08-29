const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.post(
  '/createMyReview/:showId',
  authController.restrictTo('user'),
  // reviewController.setShowUserIds,
  reviewController.createMyReview
);

router.patch(
  '/updateMyReview/:showId',
  authController.restrictTo('user'),
  reviewController.updateMyReview
);

router.delete(
  '/deleteMyReview/:id',
  authController.restrictTo('user', 'admin'),
  reviewController.deleteMyReview
);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('admin'),
    reviewController.setShowUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(authController.restrictTo('admin'), reviewController.deleteReview);

module.exports = router;
