const mongoose = require('mongoose');

const castcrewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A cast/crew must have a name!']
    },
    birthdate: {
      type: Date,
      required: [true, 'A cast/crew must have a birthdate!']
    },
    biography: {
      type: String,
      trim: true
    },
    roles: {
      type: String,
      required: [true, 'A cast/crew must have a role!']
    },
    photo: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const CastCrew = mongoose.model('CastCrew', castcrewSchema);

module.exports = CastCrew;
