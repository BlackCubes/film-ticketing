const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A show must have a title!'],
    unique: true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A show must have a price!']
  }
});

const Show = mongoose.model('Show', showSchema);
