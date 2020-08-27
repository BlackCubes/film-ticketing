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
    cloudinaryPhoto: {
      cloudinaryId: {
        type: String,
        required: [true, 'A show image needs to be in Cloudinary!']
      },
      cloudinaryUrl: {
        type: String,
        required: [true, 'A show image must have a Cloudinary URL!']
      }
    },
    imgpromo: [
      {
        type: String,
        image: {
          urlSmall: String,
          urlLarge: String
        },
        max: [5, 'A castcrew could only have 5 images!'],
        title: {
          type: String,
          trim: true
        },
        caption: {
          type: String,
          trim: true
        },
        copyright: {
          type: String,
          trim: true
        },
        created_at: {
          type: Date,
          default: Date.now()
        }
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
  ref: 'Show',
  foreignField: 'castcrew',
  localField: '_id'
});

const CastCrew = mongoose.model('CastCrew', castcrewSchema);

module.exports = CastCrew;
