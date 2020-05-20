const mongoose = require('mongoose');
const Show = require('./showModel');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review cannot be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    show: {
      type: mongoose.Schema.ObjectId,
      ref: 'Show',
      required: [true, 'A review must belong to a show!']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user!']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ show: 1, user: 1 }, { unique: true });

// DOCUMENT MIDDLEWARE
// -- populate the review
reviewSchema.pre(/^find/, function(next) {
  // If want to populate both show and users
  // this.populate({
  //   path: 'show',
  //   select: 'title'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function(showId) {
  const stats = await this.aggregate([
    {
      $match: { show: showId }
    },
    {
      $group: {
        _id: '$show',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Show.findByIdAndUpdate(showId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Show.findByIdAndUpdate(showId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

// Middleware for current review
reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.show);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.show);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
