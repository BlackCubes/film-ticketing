const mongoose = require('mongoose');

const showtimesSchema = new mongoose.Schema(
  {
    startDateTime: {
      type: Date,
      required: [true, 'A show must have a start datetime!']
    },
    endDateTime: {
      type: Date,
      required: [true, 'A show must have an end datetime!']
    },
    shows: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Shows',
        required: [true, 'A showtime must belong to a show!']
      }
    ],
    theaters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Theaters',
        required: [true, 'A showtime must belong to a theater!']
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

showtimesSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'shows',
    select: 'title'
  });

  next();
});

const Showtimes = mongoose.model('Showtimes', showtimesSchema);

module.exports = Showtimes;
