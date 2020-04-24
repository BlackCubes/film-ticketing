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
      type: [String],
      required: [true, 'A cast/crew must have a role!']
    },
    photo: {
      urlLarge: String,
      urlSmall: String
    },
    imgpromo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'ImgPromo'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

castcrewSchema.virtual('shows', {
  ref: 'Show',
  foreignField: 'castcrew',
  localField: '_id'
});

const CastCrew = mongoose.model('CastCrew', castcrewSchema);

module.exports = CastCrew;
