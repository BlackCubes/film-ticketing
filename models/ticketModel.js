const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.ObjectId,
    ref: 'Show',
    required: [true, 'Ticket(s) must belong to a show!']
  },
  theater: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theater',
    required: [true, 'Ticket(s) must belong to a theater!']
  },
  showtime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Showtimes',
    required: [true, 'Ticket(s) must belong to a showtime!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Ticket(s) must belong to a user!']
  },
  price: {
    type: Number,
    required: [true, 'Ticket(s) must have a price!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

ticketSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'show',
    select: 'title'
  });

  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
