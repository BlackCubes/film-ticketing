const mongoose = require('mongoose');
const slugify = require('slugify');

const castcrewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A cast/crew must have a name!'],
      unique: true
    },
    slug: String,
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

// DOCUMENT MIDDLEWARE
castcrewSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// VIRTUAL
// -- populate shows
castcrewSchema.virtual('shows', {
  ref: 'Shows',
  foreignField: 'castcrew',
  localField: '_id'
});

const CastCrew = mongoose.model('CastCrew', castcrewSchema);

module.exports = CastCrew;
