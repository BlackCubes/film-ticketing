const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const validationController = require('./../controllers/validationController');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router.post(
  '/createMyReview/:id',
  authController.protect,
  authController.restrictTo('user'),
  // reviewController.setShowUserIds,
  validationController.createReview,
  reviewController.createMyReview
);

router.patch(
  '/updateMyReview/:id',
  authController.protect,
  authController.restrictTo('user'),
  validationController.updateReview,
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
    validationController.createReview,
    reviewController.setShowUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    validationController.updateReview,
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview
  );

module.exports = router;
