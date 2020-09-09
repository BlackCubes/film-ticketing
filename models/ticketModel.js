const mongoose = require('mongoose');
// const Theater = require('./theaterModel');
const Showtimes = require('./showtimesModel');

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
  this.populate('user')
    .populate('theater')
    .populate('showtime')
    .populate({
      path: 'show',
      select: 'title'
    });

  next();
});

ticketSchema.statics.calcParticipants = async function(showtimeId) {
  const participants = await this.aggregate([
    {
      $match: { showtime: showtimeId }
    },
    {
      $group: {
        _id: '$showtime',
        nParticipant: { $sum: 1 }
      }
    }
  ]);

  if (participants.length > 0) {
    await Showtimes.findByIdAndUpdate(showtimeId, {
      participants: participants[0].nParticipant
    });
  } else {
    await Showtimes.findByIdAndUpdate(showtimeId, {
      participants: 0
    });
  }
};

ticketSchema.post('save', function() {
  this.constructor.calcParticipants(this.showtime);
});

ticketSchema.pre(/^findOneAnd/, async function(next) {
  this.p = await this.findOne();
  next();
});

ticketSchema.post(/^findOneAnd/, async function() {
  await this.p.constructor.calcParticipants(this.p.showtime);
});

// STATIC METHODS
// -- find query in DB
ticketSchema.statics.valueExists = function(query) {
  return this.findOne(query).then(result => result);
};

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
