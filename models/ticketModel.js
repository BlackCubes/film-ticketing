const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.ObjectId,
    ref: 'Show',
    required: [true, 'Ticket(s) must belong to a show!']
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
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
