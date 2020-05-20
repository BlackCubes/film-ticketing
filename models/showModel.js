const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A show must have a title!'],
      unique: true,
      trim: true,
      maxlength: [100, 'A show must have a title less than or equal to 100!'],
      minlength: [
        1,
        'A show must have a title more than or equal to 1 character!'
      ]
    },
    slug: String,
    originalReleaseDate: {
      type: [Date],
      required: [true, 'A show must have an original release year!']
    },
    duration: {
      type: Number,
      required: [true, 'A show must have a duration!']
    },
    mpaaRating: {
      type: String,
      required: [true, 'A show must have an MPAA rating!'],
      enum: {
        values: [
          'G',
          'PG',
          'PG-13',
          'R',
          'NC-17',
          'NR',
          'Unrated',
          'TV-Y',
          'TV-Y7',
          'TV-G',
          'TV-PG',
          'TV-14',
          'TV-MA'
        ],
        message:
          'Give the correct MPAA Rating! Acceptable: G, PG, PG-13, R, NC-17, NR, Unrated, TV-Y, TV-Y7, TV-G, TV-PG, TV-14, TV-MA.'
      }
    },
    overview: {
      type: String,
      required: [true, 'A show must have an overview!'],
      trim: true
    },
    synopsis: {
      type: String,
      trim: true
    },
    poster: {
      urlLarge: {
        type: String,
        required: [true, 'A show must have a poster!']
      },
      urlSmall: String
    },
    language: String,
    subtitles: String,
    contentType: {
      type: String,
      enum: {
        values: ['Film', 'TV'],
        message: 'Give the correct content! Acceptable: Film or TV.'
      }
    },
    castcrew: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'CastCrew',
        required: [true, 'A show must have casts and crews!']
      }
    ],
    price: {
      type: Number,
      required: [true, 'A show must have a price!']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'A discount price ({VALUE}) must be below the regular price!'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must be above 1.0!'],
      max: [5, 'A rating must be below 5.0!'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    genres: [String],
    imgpromo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'ImgPromo'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    specialVenue: {
      type: Boolean,
      default: false
    },
    secretShow: {
      type: Boolean,
      default: false
    },
    eventOrganizer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

showSchema.index({ price: 1, ratingsAverage: -1 });
showSchema.index({ slug: 1 });

// VIRTUAL
// -- convert mintues to hours
showSchema.virtual('durationHours').get(function() {
  return this.duration / 60;
});

// -- populate reviews
showSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'show',
  localField: '_id'
});

// -- populate showtimes
showSchema.virtual('showtimes', {
  ref: 'Showtimes',
  foreignField: 'shows',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE
showSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// -- populate event organizer(s)
showSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'eventOrganizer',
    select: '-__v -username -birthdate -gender -id'
  });

  next();
});

// -- populate the cast/crew
showSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'castcrew',
    select: '-__v -photo -imgpromo -birthdate -biography'
  });

  next();
});

// QUERY MIDDLEWARE
showSchema.pre(/^find/, function(next) {
  this.find({ secretShow: { $ne: true } });
  next();
});

// AGGREGATION MIDDLEWARE
showSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretShow: { $ne: true } } });
  next();
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
