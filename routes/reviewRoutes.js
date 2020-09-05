const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router.post(
  '/createMyReview/:showId',
  authController.protect,
  authController.restrictTo('user'),
  // reviewController.setShowUserIds,
  reviewController.createMyReview
);

router.patch(
  '/updateMyReview/:showId',
  authController.protect,
  authController.restrictTo('user'),
  reviewController.updateMyReview
);

router.delete(
  '/deleteMyReview/:id',
  authController.protect,
  authController.restrictTo('user', 'admin'),
  reviewController.deleteMyReview
);

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.setShowUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  );

module.exports = router;
