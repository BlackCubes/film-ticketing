const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A show must have a title!'],
    unique: true,
    trim: true
  },
  year: {
    type: Date,
    required: [true, 'A show must have an original release year!']
  },
  duration: {
    type: Number,
    required: [true, 'A show must have a duration!']
  },
  mpaaRating: {
    type: String,
    required: [true, 'A show must have a MPAA rating!']
  },
  releaseDate: Date,
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
    type: String,
    required: [true, 'A show must have a poster!']
  },
  price: {
    type: Number,
    required: [true, 'A show must have a price!']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  genres: [String],
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
